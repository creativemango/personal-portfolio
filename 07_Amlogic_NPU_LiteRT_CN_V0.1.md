<!-- page 1 of 13 -->

mlogic

# Amlogic\_NPU\_LiteRT指导

**Revision: 0.1**

**Release Date: 2026-06-25**

<!-- page 2 of 13 -->

## 版权

© 2026 晶晨半导体（上海）股份有限公司（代表其自身及其关联公司，以下简称“Amlogic”）版权所有。未经 Amlogic 书面许可，不得以任何形式或通过任何手段对本文件的任何部分进行复制、传播、转录或翻译成任何语言。

## 商标

，及 Amlogic 的其他图标均为 Amlogic 公司的商标。所有其他商标和注册商标均为其各自所有人的财产。

## 免责声明

由于产品版本升级或其他原因，本文档将可能在未经任何通知的情况下，不定期进行更新或修改。

本产品不适用于医疗、救生或生命维持等用途，也不适用于可合理预见因 Amlogic 产品故障或失灵可能导致人身伤害、死亡、严重财产或环境损害的应用场景。

文中提供的电路图及其他与 Amlogic 产品相关的信息仅为典型应用说明，完整且足以用于生产设计的全部信息不一定会提供。Amlogic已尽量确保本文件内容准确和及时，但 Amlogic 不对本文档所含信息的准确性或完整性作任何保证。

Amlogic 产品可能存在未被识别的漏洞，或可能支持具有已知局限性的既定安全标准或规范。Amlogic 对任何漏洞不承担任何责任。

使用相关材料可能需获得第三方或 Amlogic 的知识产权许可。本文档对归属于 Amlogic 或任何其他方的知识产权不授予任何明示或暗示的声明或保证。文中包含的任何第三方网站链接仅为方便用户而提供，Amlogic 不对该等网站及其任何行为（包括隐私惯例、可用性和内容）作出认可，也不承担任何责任。

在任何情况下，Amlogic 均不对与本文档相关、由本文档使用或无法使用所产生的任何索赔承担责任。

## 联系方式

公司网址:[www.amlogic.cn](http://www.amlogic.cn/)

售前咨询:[contact@amlogic.com](mailto:contact@amlogic.com)

技术支持:[support@amlogic.com](mailto:support@amlogic.com)

<!-- page 3 of 13 -->

修订记录

| Revision | Change Description |
| --- | --- |
| v0.1 (2026-06-25) | 初始版本 |

<!-- page 4 of 13 -->

## 目录

- **1. LiteRT 概述**
- 1.1 简介
- 1.2 主要特性
- 1.3 Amlogic 与 LiteRT 集成架构
- 1.4 Interpreter API
- 1.5 CompiledModel API
- 1.6 Interpreter 与 CompiledModel 对比
- 1.7 AML Delegate 简介
- **2. 平台部署总览**
- 2.1 支持平台与交付形态
- 2.2 API 与平台选型
- 2.2.1 平台选型
- 2.2.2 API 选型
- 2.3 部署前检查
- 2.3.1 硬件与版本
- 2.3.2 算子与数据类型
- 2.3.3 部署前清单
- 2.4 Demo 与示例索引
- **3. Android 部署**
- 3.1 简介
- 3.2 支持情况
- 3.3 Interpreter API部署流程
- 3.3.1 导入 LiteRT AAR
- 3.3.2 编辑 app/build.gradle
- 3.3.3 初始化 Interpreter 并挂载 AML Delegate
- 3.3.4 设备侧调试 (Interpreter 本地可执行用例
- 3.3.5 Demo 与完整工程
- 3.4 CompiledModel API 部署流程
- 3.4.1 Gradle 依赖
- 3.4.2 Kotlin 快速入门
- 3.4.3 与 Interpreter 的差异 (概要)
- 3.4.4 设备侧额外库 (示例)
- 3.4.5 Demo 与完整工程 (TODO)
- **4. Linux 部署**
- 4.1 简介
- 4.2 支持情况
- 4.3 Interpreter API 部署
- 4.3.1 Interpreter C API接口说明
- 4.3.2 部署流程
- 4.3.3 应用工程集成 (C/C++)
- 4.3.4 验证建议
- 4.4 CompiledModel API 部署(TODO)

<!-- page 5 of 13 -->

## 1. LiteRT 概述

LiteRT（Lite Runtime，TensorFlow Lite 的继任者）是 Google 面向端侧 AI 的统一推理框架。本文档在 [Google LiteRT 官方文档](https://developers.google.com/edge/litert)基础上，**归纳 Android 与 Linux 相关的集成与部署信息**，并说明 Amlogic **AML Delegate** 如何接入 LiteRT 以使用 ADLA NPU。

| 官方资源 | 链接 |
| --- | --- |
| LiteRT 总览 | developers.google.com/edge/litert |
| Android 开发 | developers.google.com/edge/litert/android |
| 示例应用 | LiteRT Sample Apps on GitHub |

## 1.1 简介

LiteRT 基于 TensorFlow Lite 演进而来，面向 Android、Linux、嵌入式等端侧平台，提供模型加载、硬件加速与推理执行能力。应用侧以<u>.tflite</u> 为统一模型载体，可通过 **Delegate** 将子图下沉到 GPU / NPU 等加速器。

在 Amlogic 平台上，本文档重点说明如何将 LiteRT 与 **AML Delegate** 结合，在 Android APK 或 Linux Native 服务中完成 NPU 推理部署。

## 1.2 主要特性

**端侧优化**:低延迟、隐私保护、离线可用、体积小、功耗低

**跨平台**:支持 Android、Linux（含 Yocto / Debian 等嵌入式发行版）、iOS 等

**多框架模型**:可将 TensorFlow、PyTorch、JAX 等模型转换为 <u>.tflite</u> 后运行

**多语言 SDK**:Java/Kotlin、C++、Python 等

**硬件加速**:通过 Delegate 或 CompiledModel 加速器选项对接 CPU / GPU / NPU

## 1.3 Amlogic 与 LiteRT 集成架构

下图展示 LiteRT 运行时与 Amlogic AML Delegate、NNSDK、ADLA 等模块的集成关系（**待补充**）:

![Image block](doc:d17037a/tier:standard/page:5/block:15)

## 1.4 Interpreter API

**Interpreter API** 归属于 LiteRT **V1.x 系列**（如:v1.2.0、v1.4.2），由 Google 官方维护，作为**基础推理层**，保证对原有 TFLite 及 LiteRT 应用的向后兼容。

<table><tbody><tr><td>项目</td><td colspan="11">说明</td></tr><tr><td>官方定位</td><td colspan="11">Basic inference API，maintained for backward compatibility</td></tr><tr><td>模型格式</td><td colspan="11">.tflite（FlatBuffers）</td></tr><tr><td>硬件加速</td><td colspan="11">通过 Delegate 机制（addDelegate / ModifyGraphWithDelegate）接入，支持 CPU / GPU / NPU 等后端（例如 AML Delegate）</td></tr><tr><td>典型用法</td><td colspan="11">加载模型→配置输入/输出张量→（可选）注册 Delegate →调用run()或runForMultipleInputsOutputs()执行同步推理</td></tr></tbody></table>

<!-- page 6 of 13 -->

Amlogic 调用链路:

```txt
应用 → LiteRT Interpreter → AML Delegate → Runtime → NNSDK → ADLA Driver → NPU
```

## 1.5 CompiledModel API

**CompiledModel API** 归属于 LiteRT **V2.x 系列**（如:v2.1.0、v2.1.5），由 Google 定义为**新一代高性能推理标准**。该 API 统一了 CPU / GPU / NPU 硬件加速路径，并提供异步执行能力及简化的设备选择机制。

| 项目 | 说明 |
| --- | --- |
| 官方定位 | Modern standard for high-performance inference |
| 模型格 |  |
| 式 | .tflite |
| 硬件加 | 通过CompiledModel.Options(Accelerator.CPU/GPU/NPU)显式指定，也支持厂商自定义扩展后端 |
| 速 |  |
| 典型用 | 创建CompiledModel实例→分配输入/输出缓冲区（ createInputBuffers / createOutputBuffers ） →填充数据→ |
| 法 | 执行推理（ run ） |

## Amlogic 调用链路:

```txt
应用 → LiteRT CompiledModel → Dispatch / Compiler Plugin → Runtime → NNSDK → ADLA Driver → NPU
```

## 1.6 Interpreter 与 CompiledModel 对比

<table><tbody><tr><td>对比项</td><td colspan="5">Interpreter</td><td colspan="5">CompiledModel</td></tr><tr><td>代表版本</td><td colspan="5">v1.2.0 ~ v1.4.2（Latest: v1.4.2）</td><td colspan="5">v2.0.3 ~ v2.1.5（Latest: v2.1.5）</td></tr><tr><td>核心 API</td><td colspan="5">Interpreter + addDelegate</td><td colspan="5">CompiledModel.create + run</td></tr><tr><td>NPU 接入</td><td colspan="3">AML Delegate（</td><td>AmlDelegate</td><td>）</td><td colspan="5">Dispatch / Compiler Plugin + AML 扩展</td></tr><tr><td>向后兼容</td><td colspan="5">兼容既有 TFLite 代码</td><td colspan="5">新 API，需按 V2 范式改造</td></tr><tr><td>Amlogic 成熟度</td><td colspan="5">当前主交付路径</td><td colspan="5">能力随版本演进</td></tr><tr><td>Google 建议</td><td colspan="5">存量应用、快速迁移</td><td colspan="5">新项目优先</td></tr></tbody></table>

版本与支持 API 对照表详见 [Google LiteRT Android 版本说明](https://developers.google.com/edge/litert/android)。平台与 API 选型建议见 2.2。

## 1.7 AML Delegate 简介

LiteRT 模型采用 FlatBuffers 格式（ <u>.tflite</u> ）存储。推理过程中，**Delegate（委托）** 负责将可加速的计算子图**下放**至 GPU、DSP、NPU等硬件后端执行，未被委托的部分则由 CPU 完成。

**AML Delegate** 是 Amlogic 为 **ADLA NPU** 提供的 LiteRT 硬件委托实现，它将 LiteRT 划分的可委托子图**转发**至 NNSDK / ADLA 运行时进行加速。该委托的硬件约束、算子支持及版本配套要求详见第 2.3 节。

<!-- page 7 of 13 -->

## 2. 平台部署总览

## 2.1 支持平台与交付形态

| 平台 | 典型场景 | 交付形态 |
| --- | --- | --- |
| Android | APK / 系统应用、Java 业务层集成 | Maven com.google.ai.edge.litert + liteRT_amlAgency.aar |
| Linux | 嵌入式服务、命令行/守护进程验证 | libLiteRt.so + AML Delegate .so + 本执行用例;将 LiteRT / Delegate 库可编入镜像或推送到目标文件系统 |

本文档按**目标操作系统**划分为 Android 和 Linux 两套部署路径。两者在 **Interpreter + AML Delegate** 层面共享相同的 NPU 加速能力，差异主要体现在集成接口与交付物形态上:

<table><tbody><tr><td>对比项</td><td>Android部署</td><td>Linux部署</td></tr><tr><td rowspan="2">应用语言</td><td>Java / Kotlin（可辅以JNI）</td><td>C / C++</td></tr><tr><td>liteRT_aml_delegate.aar</td><td></td></tr><tr><td rowspan="3">Interpreter</td><td>+ Maven litert；</td><td>libLiteRt.so + AML Delegate相关库；Interpreter C API；aml_delegate_test_bin</td></tr><tr><td>AmlDelegate +</td><td></td></tr><tr><td>Interpreter</td><td></td></tr><tr><td rowspan="2">CompiledModel</td><td>额外集成Dispatch /</td><td>libLiteRtDispatch_Aml.so、libLiteRtCompilerPlugin_Aml.so；aml_CompiledModel_benchmark</td></tr><tr><td>Compiler Plugin等动态库</td><td></td></tr><tr><td rowspan="2">模型部署路径</td><td>assets、应用私有目录或指</td><td>文件系统绝对路径（如/data/...、工作目录）</td></tr><tr><td>定绝对路径</td><td></td></tr></tbody></table>

Android 侧以 AAR 交付 AML Delegate；Linux 侧以共享库 + 可执行用例为主。

## 2.2 API 与平台选型

## 2.2.1 平台选型

**选 Android**:业务在 APK 内、需 Java/Kotlin 集成、或需与 <u>com.google.ai.edge.litert</u> 官方依赖协同

**选 Linux**:无 Android 框架、以 C/C++ 服务/命令行为主、或需在 bring-up / CI 上用本地 case 验证 NPU 链路

## 2.2.2 API 选型

根据项目阶段选择合适的推理 API:

**已有 TFLite / Interpreter 工程，需快速接入 NPU** → 优先选用 **Interpreter API + AML Delegate**

**新建项目，需统一 CPU/GPU/NPU 加速路径并支持异步推理** → 评估并选用 **CompiledModel**

无论选择哪种 API，均需确保 **LiteRT 版本、AML Delegate / AAR 版本与 ROM / BSP 版本**保持一致

## 2.3 部署前检查

## 2.3.1 硬件与版本

| 项目 | 说明 |
| --- | --- |
| 硬件 | 需设备搭载ADLA NPU，且 ROM/BSP 中 ADLA 驱动可用 |
| 版本矩阵 | LiteRT 版本、AML Delegate 版本、ROM/BSP/驱动版本需配套 |
| 平台精度 | Float32 / 量化模型支持因平台而异，详见06_Amlogic_NPU_Android_Deployment_Guide.pdf 1.4.2章节 |

## 2.3.2 算子与数据类型

<table><tbody><tr><td>类别</td><td>支持说明</td></tr><tr><td rowspan="2">算子（Op）</td><td rowspan="2">参考算子列表 support list.xlsx</td></tr><tr></tr><tr><td>浮点</td><td>Float32、Float16等；需视端侧平台与模型配置</td></tr><tr><td>整型/量化</td><td>Int8、UInt8等；支持 per-layer、per-channel 等常见量化方式</td></tr><tr><td>回退策略</td><td>无法由 NPU 执行的子图可由 LiteRT 回退至 CPU执行，保证整图可跑</td></tr></tbody></table>

<!-- page 8 of 13 -->

## 2.3.3 部署前清单

1. 确认目标板侧 **ADLA NPU** 与驱动正常；

2. 准备符合 TFLite 规范的 <u>.tflite</u> ；

3. 对齐 **LiteRT / AML Delegate / BSP** 版本组合；

4. 规划模型路径与（若启用）**编译/加载缓存**目录，避免旧缓存与新模型混用。

## 2.4 Demo 与示例索引

| API | 平台 | 说明 | 文档章节 |
| --- | --- | --- | --- |
| Interpreter | Android | 最小Interpreter + AmlDelegate示例 | 3.4（待补充完整 GitHub 链接） |
| Interpreter | Linux | aml_delegate_test_bin本地 case | 3.4.4、4.4 |
| CompiledModel | Android | Kotlin / C++ 推理示例 | 3.5 |
| CompiledModel | Linux | main_npu等 CompiledModel case | 4.5（TODO） |
| 官方参考 | - | LiteRT Sample Apps | Google Android 文档 |

<!-- page 9 of 13 -->

## 3. Android 部署

本章描述 Android 侧 **LiteRT Interpreter API** 与 **CompiledModel API** 的集成方式。

## 3.1 简介

本节介绍如何在 Android 应用中使用 LiteRT 与 **AML Delegate** 完成 APK 侧 NPU 推理。

```typescript
- Interpreter API: Interpreter + AmlDelegate (见 3.3)
```

应用在 APK 中调用 LiteRT，由 LiteRT 解析 <u>.tflite</u> 后，通过 **AML Delegate** 将子图下放至 ADLA NPU。

## 3.2 支持情况

当前仅适配内置ADLA NPU的Amlogic系列设备，算子覆盖范围、支持的数据类型与精度约束可查阅本文档2.3.2章节；平台原生Float32运算与量化推理的性能、效果差异，可参考配套文档《06\_Amlogic\_NPU\_Android\_Deployment\_Guide.pdf》获取完整说明。

## 3.3 Interpreter API部署流程

## 3.3.1 导入 LiteRT AAR

将 <u>liteRT\_aml\_delegate.aar</u> 拷贝至应用源码目录下的 <u>libs/</u> 文件夹（若不存在则手动创建）。

## 3.3.2 编辑 app/build.gradle

编辑 <u>app/build.gradle</u> ,在 <u>dependencies</u> 块中引入本地 AAR 及 LiteRT 官方依赖.

```gradle
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar','*.aar'])
    implementation 'com.google.ai.edge.litert:litert:1.2.0'
    implementation 'com.google.ai.edge.litert:litert-support-api:1.2.0'
}
```

## 3.3.3 初始化 Interpreter 并挂载 AML Delegate

## 导入 AmlDelegate 类

```txt
import org.tensorflow.lite.AmlDelegate;
```

## 创建 AmlDelegate 实例

```txt
private static AmlDelegate amlDelegate = null;
AmlDelegate.Options options_aml = new AmlDelegate.Options();
options_aml.model_path = "";   //双引号中填写板侧放置tflite模型的目录，比如"/storage/emulated/0/DCIM/yolo_int8.tflite";
amlDelegate = new AmlDelegate(options_aml);
```

## 注册 Delegate 并构建 Interpreter

```java
Interpreter.Options options = new Interpreter.Options();
options.addDelegate(amlDelegate);
private Interpreter tfLite;
MappedByteBuffer modelFile = modelFile(context.getAssets(), modelFilename);
tfLite = new Interpreter(modelFile, options);
```

## 加载模型的工具方法（ loadModelFile ）

```java
private static MappedByteBuffer loadModelFile(AssetManager assets, String modelFilename)
    throws IOException {
    AssetFileDescriptor fileDescriptor = assets.openFd(modelFilename);
    FileInputStream inputStream = new FileInputStream(fileDescriptor.getFileDescriptor());
    FileChannel fileChannel = inputStream.getChannel();
    long startOffset = fileDescriptorが始Offset();
    long declaredLength = fileDescriptor.getDeclaredLength();
    return fileChannel.map(FileChannel.MapMode.READ_ONLY, startOffset, declaredLength);
}
```

## 执行推理

<!-- page 10 of 13 -->

```javascript
tfLite.runForMultipleInputsOutputs(inputArray, outputs);
```

## 3.3.4 设备侧调试（Interpreter 本地可执行用例）

当构建产物就绪后，可直接使用 **Interpreter 本地 case** 在设备上验证 NPU 链路（无需重新编译应用工程）:

```txt
- 本地 case:aml\_delegate\_test\_bin
```

运行时依赖: <u>libLiteRt.so</u> 及 AML Delegate 配套共享库（以实际发布包为准）

## 推送并执行:

```shell
adb push <path>/aml\_delegate\_test\_bin /data/local/tmp/
adb shell
export LD\_LIBRARY\_PATH=/vendor/lib64:\$LD\_LIBRARY\_PATH
chmod +x /data/local/tmp/aml\_delegate\_test\_bin
/data/local/tmp/aml\_delegate\_test\_bin <args>
```

## 3.3.5 Demo 与完整工程

| 项目 | 说明 |
| --- | --- |
| 示例内容 | 使用Interpreter加载.tflite模型、挂载AmlDelegate并执行推理 |
| aar package Release | aar_package_link |
| 完整工程 | https://github.com/Amlogic-NN/amlnn-google-ai-ecosystem/tree/main/litert |

## 3.4 CompiledModel API 部署流程

CompiledModel API 属于 LiteRT V2.x 系列（例如 v2.1.0），提供统一 CPU / GPU / NPU 加速路径及异步执行能力。当前多数 APK 场景仍以 Interpreter 流程（3.3 节）为主，CompiledModel 适用于需要统一多后端加速或异步推理的新项目。

## 3.4.1 Gradle 依赖

在 <u>app/build.gradle</u> 中引入 LiteRT V2.x 依赖:

```gradle
dependencies {
    implementation 'com.google.ai.edge.litert:litert:2.1.0'
}
```

## 3.4.2 Kotlin 快速入门

以下示例摘自 Google 官方文档，演示加载模型、分配缓冲区并执行推理:

```kotlin
val compiledModel = CompiledModel.create(
    "/path/to/mymodel.tflite",
    CompiledModel.Options(Accelerator.CPU))  // 可替换为 GPU / NPU

val inputBuffers = compiledModel.createInputBuffers()
val outputBuffers = compiledModel.createOutputBuffers()

inputBuffers.get(0).writeFloat(input0)
compiledModel.run(inputBuffers, outputBuffers)
val output = outputBuffers.get(0).readFloat()
```

## 3.4.3 与 Interpreter 的差异（概要）

| 项目 | Interpreter(主路径) | CompiledModel(可选) |
| --- | --- | --- |
| 入口 API | Interpreter + AmlDelegate | CompiledModel 及配套编译/加载接口 |
| 额外依赖 | 通常包含在 liteRT_aml\\_delegate.aar 内 | 需要额外 Dispatch / Compiler Plugin 动态库 |

<!-- page 11 of 13 -->

## 3.4.4 设备侧额外库（示例）

使用 CompiledModel 时，需将配套动态库推送到设备（具体库名以实际发布包为准）:

```batch
adb push <path>/libLiteRt.so /data/LiteRT/
adb push <path>/libLiteRtDispatch_Aml.so /data/LiteRT/
adb push <path>/libLiteRtCompilerPlugin_Aml.so /data/LiteRT/
adb push <path>/aml_CompiledModel_benchmark /data/LiteRT/
```

具体运行结果见《06\_Amlogic\_NPU\_Android\_Deployment\_Guide.pdf》

## 3.4.5 Demo 与完整工程（TODO）

<table><tbody><tr><td>项目</td><td colspan="7">说明</td></tr><tr><td>示例类型</td><td colspan="7">CompiledModel加载.tflite模型、选择Accelerator并执行推理</td></tr><tr><td rowspan="2">官方参考</td><td rowspan="2" colspan="7">Image segmentation Kotlin/C++ Demo</td></tr><tr></tr><tr><td>aar package Release</td><td colspan="7">（TODO）</td></tr><tr><td>完整工程</td><td colspan="7">GitHub 链接（TODO）</td></tr></tbody></table>

具体 API 调用与模型产物格式以对应版本发布说明为准；

<!-- page 12 of 13 -->

## 4. Linux 部署

本章描述 Linux 侧 **Interpreter C API** 与 **CompiledModel** 的集成方式。

## 4.1 简介

Linux 侧不经过 Android Framework，采用 **C/C++ + 动态库 + 本地可执行用例**的方式集成 LiteRT 与 AML Delegate，适用于嵌入式Linux、方案验证与 Native 服务场景。

**Interpreter 链路概览:**

```txt
应用程序 / aml\_delegate\_test\_bin → LiteRT Interpreter (C API) → AML Delegate → ADLA NPU
```

## 4.2 支持情况

当前支持的设备、算子与模型类型与 Android侧一致:

**设备**:搭载 ADLA NPU 的 Amlogic 平台，Linux BSP 中 ADLA 驱动与依赖库可用。

**算子 / 数据类型**:见 **2.3.2**；平台精度差异见《06\_Amlogic\_NPU\_Android\_Deployment\_Guide.pdf》

## 4.3 Interpreter API 部署

## 4.3.1 Interpreter C API接口说明

Linux 侧**主接口**为 **Interpreter C API**，职责与 Android 的 <u>Interpreter</u> + <u>AmlDelegate</u> 对应:

| 能力 | 说明 |
| --- | --- |
| 加载模型 | 从APK assert路径加载.tflite（Float32 / Float16 / Int8 / UInt8 等） |
| 挂载 Delegate | 注册 AML Delegate，将可委托子图下放至 NPU；不支持的算子由 LiteRT 回退至 CPU 执行 |
| 执行推理 | 准备输入/输出 tensor buffer，调用 run 类接口 |
| 模型路径 / 缓存 | 支持绝对路径；若启用编译缓存，需与模型名称/MD5等标识一致 |

**Interpreter 常见交付物:**

| 类型 | 示例 | 作用 |
| --- | --- | --- |
| 运行时库 | libLiteRt.so | LiteRT Interpreter 运行时库 |
| Delegate 库 | AML Delegate 配套.so（名称随版本发布） | NPU 委托实现 |
| 本地 case | aml_delegate_test_bin | Interpreter 链路冒烟测试、精度与性能验证 |

## 4.3.2 部署流程

**准备工作:**

确认本地已具备与目标 BSP 版本匹配的以下文件

o <u>libLiteRt.so</u> 及 AML Delegate 相关 .so

o <u>aml\_delegate\_test\_bin</u> （Interpreter 验证用例）

测试用 <u>.tflite</u> 模型（浮点或量化均可）

## 拷贝至板端目录

将 so 与可执行文件拷贝到板端统一工作目录（示例使用 <u>/data/LiteRT/</u> ，可按项目约定调整）:

```txt
scp libLiteRt.so root@<board>:/data/LiteRT/
scp aml_delegate_test_bin root@<board>:/data/LiteRT/
scp <model>.tflite root@<board>:/data/LiteRT/
```

```txt
#在板端赋予可执行权限
chmod +x /data/LiteRT/aml\_delegate\_test\_bin
```

## 运行 Interpreter 本地用例

```batch
cd /data/LiteRT
./aml\_delegate\_test\_bin *.tflite
```

具体参数以发布用例的说明为准（常见参数包括模型路径、输入尺寸、循环次数等）

<!-- page 13 of 13 -->

## 4.3.3 应用工程集成（C/C++）

在自有 Native 工程中按 **Interpreter** 路径集成时，一般步骤如下:

1. 链接 <u>libLiteRt.so</u> 及 AML Delegate 相关库；

2. 通过 **Interpreter C API** 加载 <u>.tflite</u> 并注册 AML Delegate；

3. 准备输入/输出 buffer，调用推理接口；

4. 按需配置模型绝对路径、输入数据来源以及编译缓存目录。

## 4.3.4 验证建议

1. **初始化**:跑 <u>aml\_delegate\_test\_bin</u> ，确认 NPU 路径可用；

2. **精度**:对比 CPU 回退与 NPU 输出（可与 PC 金标准或 benchmark 脚本对照）；

3. **性能**:区分 pipeline（加载/首次编译）与 runtime 纯推理时间；

4. **稳定性**:长时间循环、多模型切换、异常断电恢复等。

## 4.4 CompiledModel API 部署(TODO)

仅在需要 CompiledModel 时使用；运行时通常需要额外动态库，与 Interpreter 主路径不同。

| 类型 | 示例 | 作用 |
| --- | --- | --- |
| Dispatch | libLiteRtDispatch_Aml.so | CompiledModel 运行时调度 |
| Compiler Plugin | libLiteRtCompilerPlugin_Aml.so | 编译/图构建插件 |
| 本地 case | aml_CompiledModel_benchmark | CompiledModel 链路验证 |