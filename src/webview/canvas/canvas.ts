import { type Scope } from "inertial";

/**
 * Provides canvas instance that automatically scales to its environment
 * and device.
 */
export function stage(os: Scope, container: HTMLElement) {
  let canvas = createCanvas(container);
  let size = observeElementSize(os, container);
  let devicePixelRatio = observeDevicePixelRatio(os);
  let scale = os.derive(() => {
    let { width, height } = size();
    let dpr = devicePixelRatio();
    return scaleCanvasArea(width, height, dpr);
  });
  let context = os.derive(() => {
    let { width, height, ratio } = scale();
    return acquireCanvasContext(canvas, width, height, ratio);
  });
  return { canvas, size, scale, context };
}

/** Observes element size using ResizeObserver. */
export function observeElementSize(os: Scope, target: HTMLElement) {
  const getRect = () => {
    let rect = target.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  };
  return os.produce(
    getRect(),
    (value, signal) => {
      let observer = new ResizeObserver(() => value(getRect()));
      observer.observe(target);
      signal.onabort = () => observer.disconnect();
    },
    (a, b) => a.width === b.width && a.height === b.height,
  );
}

/** Observes value of CSS custom properties dynamically updated via attributes.  */
export function observeCustomProperty(os: Scope, target: HTMLElement, property: string) {
  const getProp = () => getComputedStyle(target).getPropertyValue(property);
  return os.produce(getProp(), (value, signal) => {
    const observer = new MutationObserver((mutations) => {
      for (let mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "style") {
          return value(getProp());
        }
      }
    });
    observer.observe(target, { attributes: true });
    signal.onabort = () => observer.disconnect();
  });
}

/**
 * Observes pointer position over an element. Provides extra flags for
 * detecting whether or not the pointer os over the element and if the user
 * presses down.
 */
export function observePointer(os: Scope, target: HTMLElement) {
  let state = { down: false, over: false, x: 0, y: 0, shiftKey: false };
  function handleEvent(event: PointerEvent) {
    state.shiftKey = event.shiftKey;
    switch (event.type) {
      case "pointerdown":
        state.down = true;
        break;
      case "pointerup":
        state.down = false;
        break;
      case "pointerenter":
        state.over = true;
        break;
      case "pointerleave":
        state.over = false;
        break;
      case "pointermove":
        state.x = event.offsetX;
        state.y = event.offsetY;
        break;
    }
  }
  return os.produce(
    state,
    (value, signal) => {
      const options = { signal };
      function handle(event: PointerEvent) {
        if (event.type === "pointerdown") {
          target.setPointerCapture(event.pointerId);
        } else if (event.type === "pointerup") {
          target.releasePointerCapture(event.pointerId);
        }
        handleEvent(event);
        value(state);
      }

      target.addEventListener("pointermove", handle, options);
      target.addEventListener("pointerdown", handle, options);
      target.addEventListener("pointerup", handle, options);
      target.addEventListener("pointerenter", handle, options);
      target.addEventListener("pointerleave", handle, options);
    },
    () => false,
  );
}

/**
 * Browser's devicePixelRatio can change dynamically when user switches monitor
 * resolution or moves a browser window from one monitor to another.
 */
function observeDevicePixelRatio(os: Scope) {
  return os.produce(window.devicePixelRatio, (value, signal) => {
    let media = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    media.addEventListener("change", () => value(window.devicePixelRatio), { signal });
  });
}

/**
 * Rendering area of canvas can be different from its visual element's size.
 * This function computes proper rendering area size based on devicePixelRatio
 * and optional scaling factor that can enhance image sharpness (though by
 * consuming more CPU and RAM). `k` is an additional scale factor that
 * increases image quality by further expanding canvas area. Default is `1`.
 */
function scaleCanvasArea(width: number, height: number, dpr: number, k = 1) {
  let maxCanvasArea = 2 ** 24;
  let ratio, rwidth, rheight;

  // reduce scale factor until the canvas fits the limits
  do {
    ratio = dpr * k;
    rwidth = (width * ratio) | 0;
    rheight = (height * ratio) | 0;
  } while (rwidth * rheight > maxCanvasArea && --k > 1);

  return { width: rwidth, height: rheight, ratio };
}

/** Provides 2D context of a canvas with propertly applied sizes and scale. */
function acquireCanvasContext(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  ratio: number,
) {
  let context = canvas.getContext("2d");
  if (context == null) throw new Error("something went wrong?");
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  context.scale(ratio, ratio);
  return context;
}

/**
 * Initialize canvas element to render viz to. Parent container assumed to have
 * `position: relative` style to ensure fewer layout shifts during canvas
 * rescaling.
 */
function createCanvas(container: HTMLElement) {
  let canvas = document.createElement("canvas");
  canvas.style.display = "block";
  canvas.style.position = "absolute";
  canvas.style.inset = "0 0 0 0";
  canvas.style.background = "transparent";
  canvas.style.border = "none";
  container.append(canvas);
  return canvas;
}
