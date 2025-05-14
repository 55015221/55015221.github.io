import compression from "vite-plugin-compression";

export default function viteCompression() {
  return compression({
    verbose: true, // 是否在控制台输出压缩结果
    disable: false, // 是否禁用
    algorithm: "gzip", // 压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
    ext: ".gz", // 生成的压缩包后缀
    deleteOriginFile: false //压缩后是否删除源文件
  });
}
