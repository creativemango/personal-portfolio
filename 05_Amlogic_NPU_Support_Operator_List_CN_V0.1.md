<!-- page 1 of 14 -->

@mlogic

# Amlogic\_NPU\_Support\_O perator\_List

**Version:v0.1**

**Release Date: 2026-07-15**

<!-- page 2 of 14 -->

## 版权

© 2026 晶晨半导体（上海）股份有限公司（代表其自身及其关联公司，以下简称“Amlogic”）版权所有。未经 Amlogic 书面许可，不得以任何形式或通过任何手段对本文件的任何部分进行复制、传播、转录或翻译成任何语言。

## 商标

，及 Amlogic 的其他图标均为 Amlogic 公司的商标。所有其他商标和注册商标均为其各自所有人的财产。

## 免责声明

由于产品版本升级或其他原因，本文档将可能在未经任何通知的情况下，不定期进行更新或修改。

本产品不适用于医疗、救生或生命维持等用途，也不适用于可合理预见因 Amlogic 产品故障或失灵可能导致人身伤害、死亡、严重财产或环境损害的应用场景。

文中提供的电路图及其他与 Amlogic 产品相关的信息仅为典型应用说明，完整且足以用于生产设计的全部信息不一定会提供。Amlogic已尽量确保本文件内容准确和及时，但 Amlogic 不对本文档所含信息的准确性或完整性作任何保证。

Amlogic 产品可能存在未被识别的漏洞，或可能支持具有已知局限性的既定安全标准或规范。Amlogic对任何漏洞不承担任何责任。

使用相关材料可能需获得第三方或 Amlogic 的知识产权许可。本文档对归属于 Amlogic 或任何其他方的知识产权不授予任何明示或暗示的声明或保证。文中包含的任何第三方网站链接仅为方便用户而提供，Amlogic 不对该等网站及其任何行为（包括隐私惯例、可用性和内容）作出认可，也不承担任何责任。

在任何情况下，Amlogic 均不对与本文档相关、由本文档使用或无法使用所产生的任何索赔承担责任。

## 联系方式

公司网址:[www.amlogic.cn](http://www.amlogic.cn/)

售前咨询:[contact@amlogic.com](mailto:contact@amlogic.com)

技术支持:[support@amlogic.com](mailto:support@amlogic.com)

<!-- page 3 of 14 -->

## 修订记录

| 版本 | 修改说明 |
| --- | --- |
| V0.1 (2026-07-15) | 初始版本 |

<!-- page 4 of 14 -->

## 目录

- **1. 文档说明**
- 1.1 文档简介
- 1.2 适用平台
- 1.3 关键字说明
- **2. 算子列表**
- 2.1 ADLA2 Support List
- 2.1.1 Hardware Op List
- 2.1.2 Software OP List
- 2.1.3 Limitation
- 2.2 ADLA3 Support List
- 2.2.1 Hardware Op List
- 2.2.2 Software OP List
- 2.2.3 Limitation

<!-- page 5 of 14 -->

## 1. 文档说明

## 1.1 文档简介

本文档梳理并完整介绍**Amlogic NPU平台支持的算子集合**，覆盖硬件原生加速算子与软件适配支持算子两大类别。

文档内收录的所有算子均严格遵循TFLite标准算子规范。对于ONNX、PyTorch等其他开源框架的算子，只要可直接映射、或经拆分后可完全匹配本文档列出的算子集合，该原始框架算子即可在Amlogic NPU平台正常运行。

## 1.2适用平台

**本指南适用于以下 Amlogic NPU 平台:**

C308L / C302X

S928X

A311D2

T968D4

S905X5 / S905D5

C302X2

C305X2/A123X

A311Y3

Note:C305X2/A123X 和 A311Y3 属于**ADLA3**，其他平台属于**ADLA2**.

## 1.3关键字说明

**ADLA2（第二代Amlogic NPU芯片）**:硬件指令集仅支持int8、uint8、int16等定点整数格式运算，无原生浮点加速单元。

**ADLA3（第三代Amlogic NPU芯片）**:在定点运算能力基础上新增原生硬件支持，支持fp16、bf16浮点格式与int4低比特格式的运算。

**HW**: **Hardware Op**，运行在NPU上。

**SW: Software Op**，运行在CPU上。

<!-- page 6 of 14 -->

## 2. 算子列表

## 2.1 ADLA2 Support List

## 2.1.1Hardware Op List

**Others**:当前支持float32、int32、int64三类数据类型，有的算子可能仅适配其中单一格式；若存在暂不支持的情况，可通过后续迭代补充对应类型的支持能力。

| Operators | Int8/Uint8 | Int16 | Ohters | Note |
| --- | --- | --- | --- | --- |
| ADD | HW | HW | SW |  |
| AVERAGE_POOL_2D | HW | HW | SW |  |
| CONCATENATION | HW | HW | SW |  |
| CONV_2D | HW | HW | / |  |
| DEPTHWISE_CONV_2D | HW | HW | / |  |
| DEPTH_TO_SPACE | HW | HW | SW |  |
| EMBEDDING_LOOKUP | HW | HW | SW | SWifthelookuptensor isavariable;HW otherwise. |
| FULLY_CONNECTED | HW | HW | / |  |
| L2_POOL_2D | HW | HW | SW |  |
| LOGISTIC | HW | SW | SW |  |
| LSTM | HW | HW | / |  |
| MAX_POOL_2D | HW | HW | SW |  |
| MUL | HW | HW | SW |  |
| RELU | HW | HW | SW |  |
| RELU_N1_TO_1 | HW | HW | SW |  |
| RELU6 | HW | HW | SW |  |
| RESHAPE | HW | HW | SW |  |
| RESIZE_BILINEAR | HW/SW | HW/SW | SW | HWif1)inputwidth*heightis1x1,or2)resizingfrom[n,h,w,c]to[n,2h,2w,c]SWotherwise |
| RNN | HW | HW | / |  |
| SPACE_TO_DEPTH | HW | HW | SW |  |
| TANH | HW | SW | SW |  |
| PAD | HW | HW | SW |  |

<!-- page 7 of 14 -->

| Operators | Int8/Uint8 | Int16 | Ohters | Note |
| --- | --- | --- | --- | --- |
| GATHER | HW | HW | SW | SWifthelookuptensor isavariable;HW otherwise |
| BATCH_TO_SPACE_ND | HW | HW | SW |  |
| SPACE_TO_BATCH_ND | HW | HW | SW |  |
| TRANSPOSE | HW | HW | SW |  |
| MEAN | HW | HW | SW |  |
| SUB | HW | HW | SW |  |
| SQUEEZE | HW | HW | SW |  |
| UNIDIRECTIONAL_SEQUENCE_LSTM | HW | HW | / |  |
| STRIDED_SLICE | HW | HW | SW |  |
| SPLIT | HW | HW | SW |  |
| BIDIRECTIONAL_SEQUENCE_LSTM | HW | HW | / |  |
| PRELU | HW | HW | SW |  |
| MAXIMUM | HW | HW | SW |  |
| MINIMUM | HW | HW | SW |  |
| LESS | HW | HW | SW |  |
| NEG | HW | HW | SW |  |
| PADV2 | HW | HW | SW |  |
| GREATER | HW | HW | SW |  |
| GREATER_EQUAL | HW | HW | SW |  |
| LESS_EQUAL | HW | HW | SW |  |
| SELECT | HW | HW | SW |  |
| SLICE | HW | HW | SW |  |
| TRANSPOSE_CONV | HW | HW | / |  |
| TILE | HW | HW | SW |  |
| EXPAND_DIMS | HW | HW | SW |  |
| EQUAL | HW | HW | SW |  |
| NOT_EQUAL | HW | HW | SW |  |
| SUM | HW | HW | SW |  |
| SHAPE | HW | HW | SW |  |
| REDUCE_MAX | HW | HW | SW |  |
| PACK | HW | HW | SW |  |
| LOGICAL_OR | HW | HW | SW |  |

<!-- page 8 of 14 -->

| Operators | Int8/Uint8 | Int16 | Ohters | Note |
| --- | --- | --- | --- | --- |
| LOGICAL_AND | HW | HW | SW |  |
| LOGICAL_NOT | HW | HW | SW |  |
| UNPACK | HW | HW | SW |  |
| REDUCE_MIN | HW | HW | SW |  |
| REDUCE_ANY | HW | HW | SW |  |
| SQUARE | HW | HW | SW |  |
| FILL | HW | HW | SW |  |
| RESIZE_NEAREST_NEIGHBOR | HW | HW | SW |  |
| LEAKY_RELU | HW | HW | SW |  |
| SQUARED_DIFFERENCE | HW | HW | SW |  |
| MIRROR_PAD | HW | HW | SW |  |
| ABS | HW | HW | SW |  |
| SPLIT_V | HW | HW | SW |  |
| REVERSE_V2 | HW | HW | SW |  |
| ADD_N | HW | HW | SW |  |
| GATHER_ND | HW | HW | SW | SWiftheindicestensor isavariable;HW otherwise |
| QUANTIZE | HW/SW | SW | / | (int8&lt;-->uint8)hw，otherssw |
| HARD_SWISH | HW | HW | SW |  |
| SELECT_V2 | HW | HW | SW |  |
| BATCH_MATMUL | HW | HW/SW |  | T968D4/S905X5不支持int16*int16，转成sw |
| CUMSUM | HW | HW | SW |  |
| BROADCAST_TO | HW | HW | SW |  |
| REDUCE_ALL | HW | HW | SW |  |
| BROADCAST_ARGS | HW | HW | SW |  |

## 2.1.2 Software OP List

**All Type**: 指该算子可能存在的所有type。

| Operators | All Type |
| --- | --- |
| DEQUANTIZE | SW |
| FLOOR | SW |

<!-- page 9 of 14 -->

| Operators | All Type |
| --- | --- |
| L2_NORMALIZATION | SW |
| LOCAL_RESPONSE_NORMALIZATION | SW |
| SOFTMAX | SW |
| CUSTOM | SW |
| DIV | SW |
| EXP | SW |
| TOPK_V2 | SW |
| LOG_SOFTMAX | SW |
| CAST | SW |
| ARG_MAX | SW |
| SIN | SW |
| LOG | SW |
| SQRT | SW |
| RSQRT | SW |
| POW | SW |
| ARG_MIN | SW |
| REDUCE_PROD | SW |
| ONE_HOT | SW |
| FLOOR_DIV | SW |
| FLOOR_MOD | SW |
| RANGE | SW |
| UNIQUE | SW |
| CEIL | SW |
| COS | SW |
| ELU | SW |
| ROUND | SW |
| NON_MAX_SUPPRESSION_V4 | SW |
| NON_MAX_SUPPRESSION_V5 | SW |
| SCATTER_ND | SW |

<!-- page 10 of 14 -->

| Operators | All Type |
| --- | --- |
| MULTINOMIAL | SW |
| GELU | SW |

## 2.1.3 Limitation

| Operators | Int8/Uint8 | Int16 | Limitation |
| --- | --- | --- | --- |
| AVERAGE_POOL_2D | HW | HW | max filter size is 15x15 if output is not 1x1 |
| MAX_POOL_2D | HW | HW | max filter size is 15x15 if output is not 1x1 |

<!-- page 11 of 14 -->

## 2.2 ADLA3 Support List

## 2.2.1 Hardware Op List

| Operators | Int8/Uint8 | Int16 | f16/bf16 | Ohters | Note |
| --- | --- | --- | --- | --- | --- |
| ADD | HW | HW | HW |  |  |
| AVERAGE_POOL_2D | HW | HW | HW |  |  |
| CONCATENATION | HW | HW | HW |  |  |
| CONV_2D | HW | HW | HW |  |  |
| DEPTHWISE_CONV_2D | HW | HW | HW |  |  |
| DEPTH_TO_SPACE | HW | HW | HW |  |  |
| EMBEDDING_LOOKUP | HW | HW | HW |  | SWifthelookuptensor isavariable;HW otherwise.Note |
| FULLY_CONNECTED | HW | HW | HW |  |  |
| L2_POOL_2D | HW | HW | HW |  |  |
| LOGISTIC | HW | SW | HW |  |  |
| LSTM | HW | HW | HW |  |  |
| MAX_POOL_2D | HW | HW | HW |  |  |
| MUL | HW | HW | HW |  |  |
| RELU | HW | HW | HW |  |  |
| RELU_N1_TO_1 | HW | HW | HW |  |  |
| RELU6 | HW | HW | HW |  |  |
| RESHAPE | HW | HW | HW |  |  |
| RESIZE_BILINEAR | HW/SW | HW/SW | HW |  | HWif1)inputwidth*heightis1x1,or2)resizingfrom[n,h,w,c]to[n,2h,2w,c]SWotherwise |
| RNN | HW | HW | HW |  |  |
| SPACE_TO_DEPTH | HW | HW | HW |  |  |
| TANH | HW | SW | HW |  |  |
| PAD | HW | HW | HW |  |  |
| GATHER | HW | HW | HW |  | SWifthelookuptensor isavariable;HW otherwise |
| BATCH_TO_SPACE_ND | HW | HW | HW |  |  |
| SPACE_TO_BATCH_ND | HW | HW | HW |  |  |
| TRANSPOSE | HW | HW | HW |  |  |
| MEAN | HW | HW | HW |  |  |
| SUB | HW | HW | HW |  |  |
| SQUEEZE | HW | HW | HW |  |  |
| UNIDIRECTIONAL_SEQUENCE_LSTM | HW | HW | HW |  |  |

<!-- page 12 of 14 -->

| Operators | Int8/Uint8 | Int16 | f16/bf16 | Ohters | Note |
| --- | --- | --- | --- | --- | --- |
| STRIDED_SLICE | HW | HW | HW |  |  |
| SPLIT | HW | HW | HW |  |  |
| BIDIRECTIONAL_SEQUENCE_LSTM | HW | HW | HW |  |  |
| PRELU | HW | HW | HW |  |  |
| MAXIMUM | HW | HW | HW |  |  |
| MINIMUM | HW | HW | HW |  |  |
| LESS | HW | HW | HW |  |  |
| NEG | HW | HW | HW |  |  |
| PADV2 | HW | HW | HW |  |  |
| GREATER | HW | HW | HW |  |  |
| GREATER_EQUAL | HW | HW | HW |  |  |
| LESS_EQUAL | HW | HW | HW |  |  |
| SELECT | HW | HW | HW |  |  |
| SLICE | HW | HW | HW |  |  |
| TRANSPOSE_CONV | HW | HW | HW |  |  |
| TILE | HW | HW | HW |  |  |
| EXPAND_DIMS | HW | HW | HW |  |  |
| EQUAL | HW | HW | HW |  |  |
| NOT_EQUAL | HW | HW | HW |  |  |
| SUM | HW | HW | HW |  |  |
| SHAPE | HW | HW | HW |  |  |
| REDUCE_MAX | HW | HW | HW |  |  |
| PACK | HW | HW | HW |  |  |
| LOGICAL_OR | HW | HW | HW |  |  |
| LOGICAL_AND | HW | HW | HW |  |  |
| LOGICAL_NOT | HW | HW | HW |  |  |
| UNPACK | HW | HW | HW |  |  |
| REDUCE_MIN | HW | HW | HW |  |  |
| REDUCE_ANY | HW | HW | HW |  |  |
| SQUARE | HW | HW | HW |  |  |
| FILL | HW | HW | HW |  |  |
| RESIZE_NEAREST_NEIGHBOR | HW | HW | HW |  |  |
| LEAKY_RELU | HW | HW | HW |  |  |
| SQUARED_DIFFERENCE | HW | HW | HW |  |  |
| MIRROR_PAD | HW | HW | HW |  |  |
| ABS | HW | HW | HW |  |  |
| SPLIT_V | HW | HW | HW |  |  |
| REVERSE_V2 | HW | HW | HW |  |  |
| ADD_N | HW | HW | HW |  |  |

<!-- page 13 of 14 -->

| Operators | Int8/Uint8 | Int16 | f16/bf16 | Ohters | Note |
| --- | --- | --- | --- | --- | --- |
| GATHER_ND | HW | HW | HW |  | SWiftheindicestensor isavariable;HW otherwise |
| QUANTIZE | HW/SW | SW | SW |  | (int8&lt;-->uint8)hw，otherssw |
| HARD_SWISH | HW | HW | SW |  |  |
| SELECT_V2 | HW | HW | HW |  |  |
| BATCH_MATMUL | HW | HW/SW | HW |  | T968D4/S905X5不支持int16*int16，转成sw |
| CUMSUM | HW | HW | HW |  |  |
| BROADCAST_TO | HW | HW | HW |  |  |
| REDUCE_ALL | HW | HW | HW |  |  |
| BROADCAST_ARGS | HW | HW | HW |  |  |
| DEQUANTIZE | HW | HW | HW |  |  |
| FLOOR | HW | HW | HW |  |  |
| L2_NORMALIZATION | HW | HW | HW |  |  |
| SOFTMAX | HW | HW | HW |  |  |
| DIV | HW | HW | HW |  |  |
| EXP | HW | HW | HW |  |  |
| LOG_SOFTMAX | HW | HW | HW |  |  |
| CAST | HW | HW | HW |  |  |
| ARG_MAX | HW | HW | HW |  |  |
| SIN | HW | HW | HW |  |  |
| LOG | HW | HW | HW |  |  |
| SQRT | HW | HW | HW |  |  |
| RSQRT | HW | HW | HW |  |  |
| POW | HW | HW | HW |  |  |
| ARG_MIN | HW | HW | HW |  |  |
| REDUCE_PROD | HW | HW | HW |  |  |
| ONE_HOT | HW | HW | HW |  |  |
| FLOOR_DIV | HW | HW | HW |  |  |
| FLOOR_MOD | HW | HW | HW |  |  |
| RANGE | HW | HW | HW |  |  |
| CEIL | HW | HW | HW |  |  |
| COS | HW | HW | HW |  |  |
| ELU | HW | HW | HW |  |  |
| ROUND | HW | HW | HW |  |  |
| SCATTER_ND | HW | HW | HW |  |  |
| GELU | HW | HW | HW |  |  |

<!-- page 14 of 14 -->

## 2.2.2 Software OP List

**All Type**: 指该算子可能存在的所有type。

| Operators | All Type |
| --- | --- |
| LOCAL_RESPONSE_NORMALIZATION | SW |
| CUSTOM | SW |
| TOPK_V2 | SW |
| UNIQUE | SW |
| NON_MAX_SUPPRESSION_V4 | SW |
| NON_MAX_SUPPRESSION_V5 | SW |
| MULTINOMIAL | SW |

## 2.2.3 Limitation

| Operators | Int8/Uint8 | Int16 | Limitation |
| --- | --- | --- | --- |
| AVERAGE_POOL_2D | HW | HW | max filter size is 15x15 if output is not 1x1 |
| MAX_POOL_2D | HW | HW | max filter size is 15x15 if output is not 1x1 |