import { viteMockServe } from "vite-plugin-mock";

export default function createMock() {
  return viteMockServe({
    mockPath: "mock",
    enable: true,
    watchFiles: true,
    logger: true
  });
}
