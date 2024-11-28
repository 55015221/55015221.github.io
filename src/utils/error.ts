import {ComponentPublicInstance} from "vue";

export default function errorHandler(err: unknown, instance: ComponentPublicInstance | null, info: string) {
  console.error(err, instance, info);
  let message = `Error: ${err?.toString()}`;
  console.error(message, info);
  instance?.$message.error(message);
}
