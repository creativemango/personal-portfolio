<!-- page 1 of 374 -->

## RKNN2 算子支持与约束参考

文件标识:RK-YH-YF-418

发布版本:v2.5.0

日 期:2026-09-29

文件密级:□绝密 □秘密 □内部资料 ■公开

## 免责声明

本文档按“现状”提供，瑞芯微电子股份有限公司（“本公司”，下同）不对本文档的任何陈述、信息和内容的准确性、可靠性、完整性、适销性、特定目的性和非侵权性提供任何明示或暗示的声明或保证。本文档仅作为使用指导的参考。

由于产品版本升级或其他原因，本文档将可能在未经任何通知的情况下，不定期进行更新或修改。

**商标声明**

“Rockchip”、“瑞芯微”、“瑞芯”均为本公司的注册商标，归本公司所有。

本文档可能提及的其他所有注册商标或商标，由其各自拥有者所有。

**版权所有 © 2026 瑞芯微电子股份有限公司**

超越合理使用范畴，非经本公司书面许可，任何单位和个人不得擅自摘抄、复制本文档内容的部分或全部，并不得以任何形式传播。

瑞芯微电子股份有限公司

Rockchip Electronics Co., Ltd.

地址: 福建省福州市铜盘路软件园A区18号

网址: [www.rock-chips.com](http://www.rock-chips.com/)

客户服务电话: +86-4007-700-590

客户服务传真: +86-591-83951833

客户 服务邮箱: [fae@rock-chips.com](mailto:fae@rock-chips.com)

## 前言

**概述**

RKNN2 算子支持与约束参考

**读者对象**

本文档（本指南）主要适用于以下工程师:

技术支持工程师

软件开发工程师

**修订记录**

1

<!-- page 2 of 374 -->

| 版本号 | 作者 | 修改日期 | 修改说明 |
| --- | --- | --- | --- |
| 早期版本 | NPU 团队 | - | 详情页 |
| V2.0.0-beta | NPU 团队 | 2024-03-22 | 详情页 |
| V2.1.0 | NPU 团队 | 2024-08-07 | 详情页 |
| V2.2.0 | NPU 团队 | 2024-09-04 | 详情页 |
| V2.3.0 | NPU 团队 | 2024-11-04 | 详情页 |
| V2.3.2 | NPU 团队 | 2025-03-28 | 详情页 |
| V2.4.0 | NPU 团队 | 2026-01-15 | 详情页 |
| V2.5.0 | NPU 团队 | 2026-09-29 | 详情页 |

## 目录

RKNN2 算子支持与约束参考

更新历史V2.5.0 V2.4.0 V2.3.2 V2.3.0 V2.2.0 V2.1.0 V2.0.0-beta NPU OPs 规格介绍RK3566/RK3568

Add AddRelu BatchNormalization Concat Convolution Depthwise Convolution ConvolutionRelu ConvolutionClip ConvolutionPRelu/LeakyRelu ConvolutionAdd ConvolutionSigmoid ConvolutionTanh ConvolutionSoftplus

2

<!-- page 3 of 374 -->

ConvolutionHardSigmoid ConvolutionHardSwish ConvolutionElu ConvolutionSwish ConvolutionMish ConvolutionAddRelu ConvTranspose ConvTranposeRelu ConvTranposeClip ConvTranposePRelu/LeakyRelu ConvTranposeAdd ConvTranposeSigmoid ConvTranposeTanh ConvTranposeSoftplus ConvTranposeHardSigmoid ConvTranposeHardSwish ConvTranposeElu ConvTranposeSwish ConvTranposeMish Div Expand GRU Gather LSTM Max Min Mul MulRelu Pad MaxPool GlobalMaxPool AveragePool GlobalAveragePool Pow Relu Clip/ReLU6 PRelu

3

<!-- page 4 of 374 -->

LeakyRelu Reshape Resize Slice Split Sub Tile Transpose Sigmoid Tanh Softplus HardSigmoid HardSwish Elu exSwish exMish exGelu exSwooshR exSwooshL Where exGlu exMatMul exNorm exWindow

Add AddRelu BatchNormalization Concat Convolution Depthwise Convolution ConvolutionRelu ConvolutionClip ConvolutionPRelu/LeakyRelu ConvolutionAdd ConvolutionSigmoid ConvolutionTanh

4

<!-- page 5 of 374 -->

ConvolutionSoftplus ConvolutionHardSigmoid ConvolutionHardSwish ConvolutionElu ConvolutionSwish ConvolutionMish ConvolutionAddRelu ConvTranspose ConvTranposeRelu ConvTranposeClip ConvTranposePRelu/LeakyRelu ConvTranposeAdd ConvTranposeSigmoid ConvTranposeTanh ConvTranposeSoftplus ConvTranposeHardSigmoid ConvTranposeHardSwish ConvTranposeElu ConvTranposeSwish ConvTranposeMish Div Expand GRU Gather Hardmax LSTM Max Min Mul MulRelu Pad MaxPool GlobalMaxPool AveragePool GlobalAveragePool Pow Relu

5

<!-- page 6 of 374 -->

Clip/ReLU6 PRelu LeakyRelu Reshape Resize Slice Softmax exSoftmax13 exSoftmaxMask Split Sub Tile Transpose Sigmoid Tanh Softplus HardSigmoid HardSwish Elu exSwish exMish exGelu exSwooshR exSwooshL Where exConvStreaming exConvStreamingPRelu/LeakyRelu exGlu exMatMul exNorm exSDPAttention exWindow 562 Add AddRelu BatchNormalization Concat

6

<!-- page 7 of 374 -->

- Convolution
- Depthwise Convolution
- ConvolutionRelu
- ConvolutionClip
- ConvolutionPRelu/LeakyRelu
- ConvolutionAdd
- ConvolutionSigmoid
- ConvolutionTanh
- ConvolutionSoftplus
- ConvolutionHardSigmoid
- ConvolutionHardSwish
- ConvolutionElu
- ConvolutionSwish
- ConvolutionMish
- ConvolutionAddRelu
- ConvTranspose
- ConvTranposeRelu
- ConvTranposeClip
- ConvTranposePRelu/LeakyRelu
- ConvTranposeAdd
- ConvTranposeSigmoid
- ConvTranposeTanh
- ConvTranposeSoftplus
- ConvTranposeHardSigmoid
- ConvTranposeHardSwish
- ConvTranposeElu
- ConvTranposeSwish
- ConvTranposeMish
- Div
- Expand
- GRU
- Gather
- Hardmax
- LSTM
- Max
- Mul
- MulRelu

7

<!-- page 8 of 374 -->

Pad MaxPool GlobalMaxPool AveragePool GlobalAveragePool Pow Relu Clip/ReLU6 PRelu LeakyRelu Reshape Resize Slice Softmax exSoftmax13 exSoftmaxMask Split Sub Tile Transpose Sigmoid Tanh Softplus HardSigmoid HardSwish Elu exSwish exMish exGelu Where exGlu exMatMul exNorm exSDPAttention exWindow 1103/RV1106 Add

8

<!-- page 9 of 374 -->

- AddRelu
- BatchNormalization
- Concat
- Convolution
- Depthwise Convolution
- ConvolutionRelu
- ConvolutionClip
- ConvolutionPRelu/LeakyRelu
- ConvolutionAdd
- ConvolutionSigmoid
- ConvolutionTanh
- ConvolutionSoftplus
- ConvolutionHardSigmoid
- ConvolutionHardSwish
- ConvolutionElu
- ConvolutionSwish
- ConvolutionMish
- ConvolutionAddRelu
- ConvTranspose
- ConvTranposeRelu
- ConvTranposeClip
- ConvTranposePRelu/LeakyRelu
- ConvTranposeAdd
- ConvTranposeSigmoid
- ConvTranposeTanh
- ConvTranposeSoftplus
- ConvTranposeHardSigmoid
- ConvTranposeHardSwish
- ConvTranposeElu
- ConvTranposeSwish
- ConvTranposeMish
- Div
- Expand
- Hardmax
- LSTM
- Max
- Min

9

<!-- page 10 of 374 -->

Mul MulRelu Pad MaxPool GlobalMaxPool AveragePool GlobalAveragePoo Pow Relu Clip/ReLU6 PRelu LeakyRelu Reshape Resize Slice Softmax exSoftmax13 exSoftmaxMask Split Sub Tile Transpose Sigmoid Tanh Softplus HardSigmoid HardSwish Elu exSwish exMish exGelu Where exGlu exMatMul exSDPAttention exWindow 3576/RV1126B

10

<!-- page 11 of 374 -->

Add AddRelu BatchNormalization Concat Convolution Depthwise Convolution ConvolutionRelu ConvolutionClip ConvolutionPRelu/LeakyRelu ConvolutionAdd ConvolutionSigmoid ConvolutionTanh ConvolutionSoftplus ConvolutionHardSigmoid ConvolutionHardSwish ConvolutionElu ConvolutionSwish ConvolutionMish ConvolutionAddRelu ConvTranspose ConvTranposeRelu ConvTranposeClip ConvTranposePRelu/LeakyRelu ConvTranposeAdd ConvTranposeSigmoid ConvTranposeTanh ConvTranposeSoftplus ConvTranposeHardSigmoid ConvTranposeHardSwish ConvTranposeElu ConvTranposeSwish ConvTranposeMish Div Expand GRU Gather Hardmax

11

<!-- page 12 of 374 -->

LSTM Max Greater Min Mul MulRelu Pad MaxPool GlobalMaxPool AveragePool GlobalAveragePool Pow ReduceMax Relu Clip/ReLU6 PRelu LeakyRelu Reshape Resize Slice Softmax exSoftmax13 exSoftmaxMask Split Sub Tile Transpose Sigmoid Tanh Softplus HardSigmoid HardSwish Elu exSwish exMish exGelu Sin

12

<!-- page 13 of 374 -->

Cos Where exConvStreaming exConvStreamingPRelu/LeakyRelu exGlu exMatMul exNorm exSDPAttention exWindow 118 Add AddRelu BatchNormalization Concat Convolution Depthwise Convolution ConvolutionRelu ConvolutionClip ConvolutionPRelu/LeakyRelu ConvolutionAdd ConvolutionSigmoid ConvolutionTanh ConvolutionSoftplus ConvolutionHardSigmoid ConvolutionHardSwish ConvolutionElu ConvolutionSwish ConvolutionMish ConvTranspose Div Expand LSTM Max Mul MulRelu Pad MaxPool

13

<!-- page 14 of 374 -->

GlobalMaxPool AveragePool GlobalAveragePool Pow Relu Clip/ReLU6 PRelu LeakyRelu Reshape Resize Slice Softmax exSoftmax13 exSoftmaxMask Split Sub Tile Transpose Sigmoid Tanh Softplus HardSigmoid HardSwish Elu exSwish exMish exGelu Where exConvStreaming exConvStreamingPRelu/LeakyRelu exGlu exMatMul exWindow 103B/RV1106B Add AddRelu BatchNormalization

14

<!-- page 15 of 374 -->

- Concat
- Convolution
- Depthwise Convolution
- ConvolutionRelu
- ConvolutionClip
- ConvolutionPRelu/LeakyRelu
- ConvolutionAdd
- ConvolutionSigmoid
- ConvolutionTanh
- ConvolutionSoftplus
- ConvolutionHardSigmoid
- ConvolutionHardSwish
- ConvolutionElu
- ConvolutionSwish
- ConvolutionMish
- ConvTranspose
- ConvTranposeRelu
- ConvTranposeClip
- ConvTranposePRelu/LeakyRelu
- Div
- Expand
- Max
- Mul
- MulRelu
- Pad
- MaxPool
- GlobalMaxPool
- AveragePool
- GlobalAveragePool
- Relu
- Clip/ReLU6
- PRelu
- LeakyRelu
- Reshape
- Resize
- Slice
- Softmax

15

<!-- page 16 of 374 -->

exSoftmax13 exSoftmaxMask Split Sub Tile Transpose Sigmoid Tanh Softplus HardSigmoid HardSwish Elu exSwish exMish exGelu Where exGlu exMatMul exWindow U OPs 规格介绍注: Add AveragePool ArgMin ArgMax BatchNormalization Cast Clip Concat Convolution ConvTranspose/Deconvolu ConvTransposePad Cos DataConvert DepthToSpace Div

16

<!-- page 17 of 374 -->

Equal Exp Flatten Gather Greater GreaterOrEqual GRU exGRU exHardSwish InstanceNormalization exLayerNorm Less LessOrEqual LogSoftmax LpNormalization exLRN MatMul Max MaxPool MaxRoiPool MaxUnpool exMish Min Mul Pad Pow exProposal ReduceMax ReduceMean ReduceSum ReduceMin Reorg Reshape Resize ReverseSequence exRMSNorm RoiAlign

17

<!-- page 18 of 374 -->

ScatterND Sin Slice Softmax exSoftmax13 SpaceToDetph Split Sqrt Squeeze Sub Tanh Tile Transpose Upsample Not where Erf Floor Mod exMeanVarianceNormalization And GatherElements Log exDataConvert SpaceToDepth SoftmaxMask TransposeReshape ReshapeTranspose ReduceL2 LayerNormalization PassThrough Expand Sigmoid Tanh Cos Sin exSwish

18

<!-- page 19 of 374 -->

exGlu exGelu exWindow exNorm Round TopK exSwooshR exSwooshL OneHot Cumsum GPU OPs 规格介绍注: GridSample GRU exGelu模型输入输出限制说明模型输入限制说明RK3566/RK3568 RK3588 RV1103/RV1106 RK3562 RK3576/RV1126B RK2118 RV1103B模型输出限制说明RK3566/RK3568 RK3588 RV1103/RV1106 RK3562 RK3576/RV1126B RK2118 RV1103B/RV1106B

特殊说明dilated\_kernel\_h dilated\_kernel\_w

19

<!-- page 20 of 374 -->

## 更新历史

**V2.5.0**

**修改人**:NPU 团队

**修改日期**:2026-09-29

**修改内容**

1. 版本号更新为 V2.5.0

## V2.4.0

**修改人**:NPU 团队

**修改日期**:2026-01-15

**修改内容**

1. 新增GPU 算子支持文档2. CPU 算子支持列表新增Pow/CumSum 3. 3588NPU 实现新增ReduceMax+exConvStreaming算子文档4. 3576NPU 实现新增ReduceMax/exConvStreaming/Sin/Cos算子文档5. 1126BNPU 实现新增ReduceMax+exConvStreaming算子文档

## V2.3.2

**修改人**:NPU 团队

**修改日期**:2025-03-28

## 修改内容

1. 增加RV1126B平台文档2. 增加RV1106B平台文档3. 更新全平台ConvDilation参数限制4. 更新Resize算子限制

## V2.3.0

**修改人**:NPU 团队

**修改日期**:2024-11-04

## 修改内容

1. 增加RK3576/RK3588/RK3562/RK3568平台exNorm的mean\_var模式文档说明

2. 全平台MAX/MINOP支持Broadcast

3. 修改RK3576Softmax限制规格

20

<!-- page 21 of 374 -->

## V2.2.0

**修改人**:NPU 团队

**修改日期**:2024-09-03

## 修改内容

1. 全平台(除rk3568)修改softmax规格限制,新增softmax切分

2. RK3576、RK3588、RK3562、RK3568新增RMSNorm支持

## V2.1.0

**修改人**:NPU 团队

**修改日期**:2024-08-07

## 修改内容

1. 新增RK2118文档说明

2. 新增RV1103B文档说明

3. 全平台算子规格更新

4. RK3576算子规格新增(包含Hardmax、ConvLut等)

5. RK2118exConvStreaming支持

6. RK3562/RK3576exSDPA算子添加FlashAttentionV2优化支持

## V2.0.0-beta

**修改人**:NPU 团队

**修改日期**:2024-03-22

## 修改内容

1. 新增RK3576平台算子支持规格

2. 新增RK3588/RK3562/RK3576平台的exSDPAttention、exMatMul的硬件支持规格

3. 新增Floor、Mod、And、GatherElements以及exMeanVarianceNormalizationCPU 算子支持

4. 新增RK2118平台算子支持规格

21

<!-- page 22 of 374 -->

# NPU OPs 规格介绍

# RK3566/RK3568

## Add

执行元素级二进制加法(C=A+B),支持多向Numpy样式的广播输入列表

A:T1,T2 shape:[batch,channel,height,width]

量化支持per-layer

广播支持支持任意维度广播操作广播约束同Expand算子

B:T1,T2 shape:[batch,channel,height,width]

量化支持per-layer

广播支持支持任意维度广播操作广播约束同Expand算子

输出列表

C:T1 shape:[batch,channel,height,width]量化支持per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(constTensor)

## AddRelu

22

<!-- page 23 of 374 -->

Add与Relu融合计算,C=Relu(A+B)输入列表同Add输出列表同Add其他支持多核联合:支持

## BatchNormalization

按照论文[https://arxiv.org/abs/1502.03167](https://arxiv.org/abs/1502.03167)中的描述对输入张量进行批量归一化计算

输入列表

input:T1 shape:[batch,channel,height,width]量化支持per-layer

输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

属性列表

epsilon:float（默认值=1e-5）

除以标准差时加上防止除0的实数

epsilon∈(0,∞]

momentum:float

训练时的滑动平均参数

## Concat

23

<!-- page 24 of 374 -->

## 将一系列向量在axis指定的方向上组合成一个向量，所有向量除axis指定的方向外大小必须相同输入列表

input\_tensor:T

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T

shape:[batch,channel,height,width]

量化支持per-layer

数据类型约束

T:int8(Tensor),float16(Tensor)

属性列表

axisint64

axis∈{0,1,2,3}

## Convolution

卷积

输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

width: 当dilated\_kernel\_h>1时,width<16383。此外,对首层输入width存在限制，详见模型输入说明。

量化支持

per-layer

weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,31]

kernel\_w∈[1,31]

量化支持

24

<!-- page 25 of 374 -->

per-layer

per-channel

## 输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 属性列表

strides:int(strides\_h,strides\_w)

stride\_h∈[1,7]

stride\_w∈[1,7]

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right)

pads\_top∈[0,15]

pads\_left∈[0,15]

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,31]

dilations\_w∈[1,31]

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## Depthwise Convolution

深度可分离卷积

输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

width: 当dilated\_kernel\_h>1时,width<16383。此外,对首层输入width存在限制，详见模型输入说明。

## 量化支持

per-layer

25

<!-- page 26 of 374 -->

## weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,8]

kernel\_w∈[1,8]

量化支持

per-layer

per-channel

## 输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 属性列表

strides:int(strides\_h,strides\_w)

stride\_h∈[1,7]

stride\_w∈[1,7]

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right)

pads\_top∈[0,15]

pads\_left∈[0,15]

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,32]

dilations\_w∈[1,32]

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## ConvolutionRelu

Convolution与Relu融合计算,Output=Relu(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionClip

26

<!-- page 27 of 374 -->

Convolution与Clip融合计算,Output=Clip(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionPRelu/LeakyRelu

Convolution 与 PRelu/LeakyRelu 融合计算, Output = PRelu(Conv(Input)) 或者 Output =

LeakyRelu(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionAdd

Convolution与Add融合计算,Output=Add(Conv(Input0),Input1) 说明及规格限制同Convolution

## ConvolutionSigmoid

Convolution与Sigmoid融合计算, $\mathsf { { . O u t p u t } { = } S i g m o i d ( C o n v ( I n p u t ) ) }$ 说明及规格限制同Convolution

## ConvolutionTanh

Convolution与Tanh融合计算,Output=Tanh(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionSoftplus

Convolution与Softplus融合计算, $, \mathsf { O u t p u t } { = } \mathsf { S o f t p l u s } ( \mathsf { C o n v } ( \mathsf { I n p u t } ) )$ 说明及规格限制同Convolution

## ConvolutionHardSigmoid

Convolution与HardSigmoid融合计算,Output=HardSigmoid(Conv(Input)) 说明及规格限制同

Convolution

## ConvolutionHardSwish

Convolution与HardSwish融合计算,Output=HardSwish(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionElu

Convolution与Elu融合计算, $\mathsf { I O u t p u t } { = } \mathsf { E I u } ( \mathsf { C o n v } ( \mathsf { I n p u t } ) )$ 说明及规格限制同Convolution

## ConvolutionSwish

Convolution与Swish融合计算,Output=Swish(Conv(Input)) 说明及规格限制同Convolution

27

<!-- page 28 of 374 -->

## ConvolutionMish

Convolution与Mish融合计算,Output=Mish(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionAddRelu

Convolution与Add及Relu融合计算,Output=Relu(Add(Conv(Input0),Input1)) 说明及规格限制同Convolution

## ConvTranspose

转置卷积

输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

width: 当dilated\_kernel\_h>1时,width<16383。此外,对首层输入width存在限制，详见模型输入说明。

量化支持

per-layer

weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,31]

kernel\_w∈[1,31]

量化支持

per-layer

per-channel

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

属性列表

strides:int(strides\_h,strides\_w)

28

<!-- page 29 of 374 -->

stride\_h仅支持1,2,4,8

stride\_w仅支持1,2,4,8

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right) 设置pad时注意: 不支持kernel\_h**dilations\_h-dilations\_h-pads\_top<0** 不支持**kernel\_w**dilations\_w-dilations\_wpads\_left<0 不支持stride\_h**(height-1)-pads\_top+1<output\_h** 不支持**stride\_w**(width-1)- pads\_left+1<output\_w

pads\_top∈[0,15]

pads\_left∈[0,15]

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

group:仅支持1,当且仅当num\_input=num\_output时支持num\_output

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,32]

dilations\_w∈[1,32]

当dilation不等于(1,1)时，只支持kernel=(1,1)

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## ConvTranposeRelu

ConvTranpose与Relu融合计算,Output=Relu(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeClip

ConvTranpose与Clip融合计算,Output=Clip(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposePRelu/LeakyRelu

ConvTranpose与PRelu/LeakyRelu融合计算,Output=PRelu(ConvTranpose(Input))或者Output= LeakyRelu(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeAdd

ConvTranpose与Add融合计算,Output=Add(ConvTranpose(Input0),Input1) 说明及规格限制同ConvTranspose

29

<!-- page 30 of 374 -->

## ConvTranposeSigmoid

ConvTranpose与Sigmoid融合计算,Output=Sigmoid(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeTanh

ConvTranpose与Tanh融合计算,Output=Tanh(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeSoftplus

ConvTranpose与Softplus融合计算,Output=Softplus(ConvTranpose(Input)) 说明及规格限制同

ConvTranspose

## ConvTranposeHardSigmoid

ConvTranpose与HardSigmoid融合计算,Output=HardSigmoid(ConvTranpose(Input))

## ConvTranposeHardSwish

ConvTranpose与HardSwish融合计算,Output=HardSwish(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeElu

ConvTranpose与Elu融合计算,Output=Elu(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeSwish

ConvTranpose与Swish融合计算,Output=Swish(ConvTranpose(Input)) 说明及规格限制同

ConvTranspose

## ConvTranposeMish

ConvTranpose与Mish融合计算,Output=Mish(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## Div

执行元素级二进制除法(C=A/B),支持多向Numpy样式的广播

30

<!-- page 31 of 374 -->

## 输入列表

A:T1,T2 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

B:T1,T2

shape:[batch,channel,height,width]

量化支持

per-layer

广播支持支持任意维度广播操作广播约束同Expand算子

输出列表

C:T1 shape:[batch,channel,height,width]量化支持per-layer

数据类型约束

T1:float16(Tensor)

T2:float(constTensor)

## Expand

根据给定的 shape 和广播规则广播输入张量。广播规则类似于 numpy.array(input) \* numpy.ones(shape):维度右对齐；两个对应维度必须具有相同的值，或者其中一个等于1

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

31

<!-- page 32 of 374 -->

shape:T2

shape:[batch,channel,height,width]

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:int64(Tensor)

广播约束

$[ \mathsf { b , } \mathsf { c , } \mathsf { 1 , } \mathsf { w } ] \mathsf { - } \mathsf { > } [ \mathsf { b , } \mathsf { c , } \mathsf { h , } \mathsf { w } ] \mathsf { , } \mathsf { h } \mathsf { \in } [ \mathsf { 1 , } \mathsf { 8 1 9 2 } ]$

[b,1,1,w]->[b,c,h,w],h∈[1,8192]

$\scriptstyle [ { \mathsf { b } } , { \mathsf { c } } , { \mathsf { h } } , { \mathsf { 1 } } ] - > [ { \mathsf { b } } , { \mathsf { c } } , { \mathsf { h } } , { \mathsf { w } } ] , { \mathsf { w } } \in [ { \mathsf { 1 } } , { \mathsf { 8 1 9 2 } } ]$

[b,1,h,1]->[b,c,h,w],w ∈[1,8192]

[b,c,1,1]->[b,c,h,w],h∈[1,8192],w ∈[1,8192]

## GRU

门控循环单元（GRU，GatedRecurrentUnit） GRU扩展以及变体命名为exGRU算子，参数项中指明（extern）的项为exGRU独有的参数项。 计算公式如下: Equations(Default:f=Sigmoid,g=Tanh): r\_t = $\mathsf{f}(\mathsf{x\_t} \cdot \mathsf{W\_r} + \mathsf{h\_t}(\mathsf{t}-1) \cdot \mathsf{R\_r} + \mathsf{Wb\_r} + \mathsf{Rb\_r}) \mathsf{z\_t} = \mathsf{f}(\mathsf{x\_t} \cdot \mathsf{W\_z} + \mathsf{h\_t}(\mathsf{t}-1) \cdot \mathsf{R\_z} + \mathsf{Wb\_z} + \mathsf{Rb\_z}) \mathsf{h\_t}$ $= \mathsf { g } ( \mathsf { x } \_ \mathsf { t } \cdot \mathsf { W } \_ \mathsf { h } + ( \mathsf { r } \_ \mathsf { t } \circ \mathsf { h } \_ \{ \mathsf { t } - 1 \} ) \cdot \mathsf { R } \_ \mathsf { h } + \mathsf { R b } \_ \mathsf { h } + \mathsf { W b } \_ \mathsf { h } ) , \; ( \mathsf { W R B } { = } 0 ) \; \mathsf { h } \_ \mathsf { t } = \mathsf { g } ( \mathsf { x } \_ \mathsf { t } \cdot \mathsf { W } \_ \mathsf { h } + \mathsf { r } \_ \mathsf { t } \circ \mathsf { w } \_ \mathsf { t } ) , \; \mathsf { w } \_ \mathsf { t } = \mathsf { w } \_ \mathsf { t } \circ \mathsf { w } \_ \mathsf { t } .$ $( \mathsf { h \_ \{ t { - } 1 \} \cdot R \_ h + R b \_ h ) ) + W b \_ h , ( W R B { = } 1 ) H \_ t = ( 1 - z \_ t ) \odot h \_ t + z \_ t \odot h \_ \{ t { - } 1 \} }$

输入列表

X:T1

shape:[seq\_length,batch\_size,input\_size]

seqlength∈(0,8192]

batchsize∈(0,8192],大于1时仅支持4的倍数

inputsize∈(0,8192]

量化支持

per-layer

W:T1

shape:[num\_directions,4\*hidden\_size,input\_size]

32

<!-- page 33 of 374 -->

- • inputsize∈(0,8192]
- • hiddensize∈(0,8192]
- • numdirections:1or2
- • 量化支持
- • per-layer
- • per-channel
- R:T1
- • shape:[num\_directions,4\*hidden\_size,hidden\_size]
- • hiddensize∈(0,8192]
- • numdirections:1or2
- • 量化支持
- • per-layer
- • per-channel
- B:T2
- • shape:[num\_directions,8\*hidden\_size]
- • hiddensize∈(0,8192]
- • numdirections:1or2
- • 量化支持
- • per-layer
- • per-channel
- sequence\_lens:T3(optional)
- • shape:[batch\_size]
- • batchsize∈(0,8192],大于1时仅支持4的倍数
- initial\_h:T1(optional)
- • shape:[num\_directions,batch\_size,hidden\_size]
- • numdirections:1or2
- • batchsize∈(0,8192],大于1时仅支持4的倍数
- • hiddensize∈(0,8192]
- • 量化支持
- • per-layer

## 输出列表

Y:T1

shape:[seq\_length,num\_directions,batch\_size,hidden\_size]

33

<!-- page 34 of 374 -->

seqlength∈(0,8192]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

## 量化支持

per-layer

Y\_h:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

## 属性列表

## linear\_before\_reset:int

LBR变种的选择:1(T)or0(F)

direction(extern):string

指定GRU的运算方向

forward:指定GRU的运算方向为前向

reverse:指定GRU的运算方向为反向

bidirectional:指定GRU的运算方向为双向

## sequence\_size(extern):int

指定GRU输入的seqsize，无限制，建议4对齐

## hidden\_size(extern):int

GRU单元中的hiddensize，无限制，建议8对齐

## input\_layout(extern):int

指定与对应输入shape含义一致的layout

要求填写指定的layout，同时要求填写该op实际对应的batch\_size、sequence\_size、hidden\_size。

snc:指定layout对应的输入shape为[seqs,batches,input\_size]

(sn)c:指定layout对应的输入shape为[seqs\*batches,input\_size,1,1]

## output\_layout(extern):int

指定与对应输出shape含义一致的layout

要求填写指定的layout，同时要求填写该op实际对应的batch\_size、sequence\_size、hidden\_size、directions。

34

<!-- page 35 of 374 -->

sbnc:指定layout对应的输出shape为[seqs,directions,batches,hidden\_size]

(sn)c:指定layout对应的输出shape为[seqsbatches,directionsinput\_size,1,1]

## 数据类型约束

T1:float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## 其他支持

多核联合:暂不支持

## Gather

根据索引Indices获取输入X的指定axis维度的条目，并将它们拼接在一起。

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持

per-layer

Indices:T2

要收集的元素的索引，秩rank =1

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:int(Tensor)

属性列表

axis:int(Tensor)

axis∈{0,1,2,3}

指定Indices获取输入的维度

35

<!-- page 36 of 374 -->

## 其他支持

多核联合:尚不支持

## LSTM

长短期记忆网络（LSTM，Long Short-Term Memory） LSTM扩展以及变体命名为exLSTM算子，参数项中指明 （extern）的项为exLSTM独有的参数项。 计算公式如下:

```txt
Equations(Default:f=Sigmoid,g=Tanh,h=Tanh): i_t = f(x_t · W_i + h_{t-1} · R_i + Wb_i + Rb_i) f_t = f(x_t · W_f + h_{t-1} · R_f + Wb_f + Rb_f) c_t = f(x_t · W_c + h_{t-1} · R_c + Wb_c + Rb_c) o_t = f(x_t · W_o + h_{t-1} · R_o + Wb_o + Rb_o) C_t = f_t ⊙ C_{t-1} + i_t ⊙ c_t h_t = o_t ⊙ h(C_t)
```

输入列表

```python
• X:T1
    • shape:[seq_length,batch_size,input_size]
        • seqlength∈(0,8192]
        • batchsize∈(0,8192],大于1时仅支持4的倍数
        • inputsize∈(0,8192]
    • 量化支持
        • per-layer
• W:T1
    • shape:[num_directions,4*hidden_size,input_size]
        • inputsize∈(0,8192]
        • hiddensize∈(0,8192]
        • numdirections:1or2
    • 量化支持
        • per-layer
        • per-channel
• R:T1
    • shape:[num_directions,4*hidden_size,hidden_size]
        • hiddensize∈(0,8192]
        • numdirections:1or2
    • 量化支持
        • per-layer
        • per-channel
• B:T2,T3
    • shape:[num_directions,8*hidden_size]
```

36

<!-- page 37 of 374 -->

hiddensize∈(0,8192]

numdirections:1or2

量化支持

per-layer

per-channel

sequence\_lens:T4,T5(optional)

shape:[batch\_size]

batchsize∈(0,8192],大于1时仅支持4的倍数

initial\_h:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

initial\_c:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

## 输出列表

Y:T1

shape:[seq\_length,num\_directions,batch\_size,hidden\_size]

seqlength∈(0,8192]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

Y\_h:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

37

<!-- page 38 of 374 -->

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

## 量化支持

per-layer

## Y\_c:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

## 属性列表

direction(extern):string

指定LSTM的运算方向

forward:指定LSTM的运算方向为前向

reverse:指定LSTM的运算方向为反向

bidirectional:指定LSTM的运算方向为双向

sequence\_size(extern):int

指定LSTM输入的seqsize，无限制，建议4对齐

hidden\_size(extern):int

LSTM单元中的hiddensize，无限制，建议8对齐

proj\_size(extern):int

projection时的proj\_size，projsize∈[0,hiddensize]

目前限定0，即尚不支持projection功能

input\_forget(extern):int

cifg变种的选择:1(T)or0(F) 目 前限定0，即尚不支持

has\_projection(extern):int

projection变种:1(T)or0(F) 目 前限定0，即尚不支持

## input\_layout(extern):int

指定与对应输入shape含义一致的layout

要求填写指定的layout，同时要求填写该op实际对应的batch\_size、sequence\_size、hidden\_size。

snc:指定layout对应的输入shape为[seqs,batches,input\_size]

38

<!-- page 39 of 374 -->

(sn)c:指定layout对应的输入shape为[seqs\*batches,input\_size,1,1]

output\_layout(extern):int

指定与对应输出shape含义一致的layout

要求填写指定的layout，同时要求填写该op实际对应的batch\_size、sequence\_size、hidden\_size、directions。

sbnc:指定layout对应的输出shape为[seqs,directions,batches,hidden\_size]

(sn)c:指定layout对应的输出shape为[seqsbatches,directionsinput\_size,1,1]

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:int32(Tensor)

T4:float(Scalar)

T5:int(Scalar)

## 其他支持

多核联合:暂不支持

## Max

计算输入张量的元素级最大值

输入列表

A:T1

shape:[batch,channel,height,width]

量化支持per-layer

广播支持

支持任意维度广播操作

广播约束同Expand算子

B:T1

shape:[batch,channel,height,width]

量化支持per-layer

广播支持

支持任意维度广播操作

广播约束同Expand算子

39

<!-- page 40 of 374 -->

## 输出列表

C:T1 shape:[batch,channel,height,width]量化支持per-layer/per-channel

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:暂不支持

## Min

计算输入张量的元素级最小值

- 输入列表
- • A:T1
- • shape:[batch,channel,height,width]
- • 量化支持
- • per-layer
- • 广播支持
- • 支持任意维度广播操作
- • 广播约束同Expand算子
- • B:T1
- • shape:[batch,channel,height,width]
- • 量化支持
- • per-layer
- • 广播支持
- • 支持任意维度广播操作
- • 广播约束同Expand算子
- 输出列表
- • C:T1
- • shape:[batch,channel,height,width]
- • 量化支持

40

<!-- page 41 of 374 -->

per-layer/per-channel

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:暂不支持

## Mul

执行元素级二进制乘法(C=A\*B),支持多向Numpy样式的广播

## 输入列表

shape:[batch,channel,height,width]

量化支持per-layer

广播支持支持任意维度广播操作广播约束同Expand算子

B:T1,T2 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

## 输出列表

C:T1 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

41

<!-- page 42 of 374 -->

## T2:float(constTensor)

## MulRelu

其余说明同Mul

支持的数据类型: 同Mul

## Pad

给定一个包含要填充的数据的张量(data),包含轴的开始和结束填充数值的张量(pads),模式(mode),常量数值(constant\_value),生成一个填充张量(output)

输入列表

data:T1

shape:[batch,channel,height,width]

量化支持

per-layer

pads:T2

shape : [batch\_begin, channel\_begin, height\_begin, width\_begin, batch\_end, channel\_end,height\_end,width\_end]

constant\_value(optional):T3

shape:[1]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:int64(Tensor)

T3:float(Scalar),int8(Scalar),float16(Scalar)

属性列表

42

<!-- page 43 of 374 -->

mode:string(默认值constant)

支持模式:constant,reflect

constant无限制

reflectchannel∈(0,8192],height∈(0,8192],width∈(0,8176]

其他支持

多核联合:尚不支持

## MaxPool

MaxPool消耗输入张量X并根据内核大小、步幅大小和pad长度在张量上应用最大池化。最大池化包括根据内核大小计算输入张量子集的所有值的最大值，并将数据下采样到输出张量Y中以进行进一步处理。 输出空间形状的计算方式有所不同，具体取决于是否使用显式填充（在使用pads的情况下）或使用 自 动填充（在使用auto\_pad的情况下）。仅使用显式填充

输入列表

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

height∈(0,8192]

width∈(0,8192]

输出列表

output:T1

shape:[batch,channel,height,width]

属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

kernel\_h∈(0,7]

kernel\_w∈(0,7]

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

43

<!-- page 44 of 374 -->

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

storage\_order:int64

优先储存方式:0

数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## GlobalMaxPool

GlobalMaxPool使用输入张量X并对同一通道中的值应用最大池化。这相当于MaxPool的kernel\_shape 大小等于input的空间维度。

输入列表

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

height∈(1,7]

width∈(1,7]

输出列表

output:T1

shape:[batch,channel,height,width]

属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

kernel\_h∈(0,7]

kernel\_w∈(0,7]

auto\_pad:string

pad的方式:仅支持NOTSET

44

<!-- page 45 of 374 -->

ceil\_mode:int64

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## AveragePool

AveragePool使用输入张量X并根据内核大小、步幅大小和pad长度在张量上应用平均池化。平均池化包括根据内核大小计算输入张量子集的所有值的平均值，并将数据下采样到输出张量Y中以进行进一步处理。输出空间形状的计算方式有所不同，具体取决于是否使用显式填充（在使用pads的情况下）或使用 自动填充（在使用auto\_pad的情况下）。仅使用显式填充

输入列表

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

height∈(0,8192]

width∈(0,8192]

输出列表

output:T1

shape:[batch,channel,height,width]

属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

45

<!-- page 46 of 374 -->

kernel\_h∈(0,7]

kernel\_w∈(0,7]

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## GlobalAveragePool

GlobalAveragePool使用输入张量X并对同一通道中的值应用平均池化。这相当于AveragePool，其kernel\_shape大小等于输入张量的空间维度。

输入列表\*

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

height∈(0,7]

width∈(0,7]

输出列表

output:T1

shape:[batch,channel,height,width]

46

<!-- page 47 of 374 -->

## 属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

kernel\_h∈(0,7]

kernel\_w∈(0,7]

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## Pow

Z =XY 指数运算，采用输入数据（张量）和指数，并产生一个输出数据（张量）

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持

per-layer

Y:T2

shape:[1]

当前仅支持0、1、2、3、0.5、-0.5

47

<!-- page 48 of 374 -->

## 输出列表

Z:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:int8(Tensor),int32(Tensor),int64(Tensor),float16(Tensor),float(Tensor)

## 其他支持

多核联合:尚不支持

## Relu

将输入张量的负值设为零，正值保持不变

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持per-layer

广播支持

无

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:暂不支持

48

<!-- page 49 of 374 -->

## Clip/ReLU6

## 将输入张量的值裁剪到[0,6]范围内

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持per-layer

广播支持无

输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:暂不支持

## PRelu

将输入张量的负值按可学习参数缩放，正值保持不变

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持per-layer/per-channel

广播支持

无

## 输出列表

output:T1

49

<!-- page 50 of 374 -->

shape:[batch,channel,height,width]

量化支持

per-layer/per-channel

## 属性列表

slope:PRelu系数仅支持单个标量或C维度系数

数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:暂不支持

## LeakyRelu

将输入张量的负值按固定比例缩放，正值保持不变

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持per-layer

广播支持无

输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:暂不支持

50

<!-- page 51 of 374 -->

## Reshape

在不改变输入数据和元素数量的情况下，返回一个具有指定形状的张量。

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

属性列表

shape:int

指定输出张量的形状

其他支持

多核联合:尚不支持

## Resize

调整输入张量的大小。一般来说，它将输出张量中的每个值计算为输入张量中邻域（即采样位置）的加权平均值

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持

per-layer

roi(optional):T2

目前暂不支持

51

<!-- page 52 of 374 -->

scales(optional):T2

沿每个维度的缩放比例数组

sizes(optional):T3

输出张量的目标大小

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:int64(Tensor)

## 属性列表

antialias:int（默认值为0）

目前不支持设置

axes:int[]

目前不支持设置

coordinate\_transformation\_mode:strings（默认值为”half\_pixel”）目 前仅支持half\_pixel，pytorch\_half\_pixel，align\_corners三种

cubic\_coeff\_a:float（默认为-0.75）

目前不支持设置

exclude\_outside:int（默认值为0）目前不支持设置

extrapolation\_value:float（默认为0）

目前不支持设置

keep\_aspect\_ratio\_policy:strings（默认值为”stretch”）

目前不支持设置

mode:strings（默认值为”nearest”）

目 前仅支持nearest和linear两种可配置

nearest\_mode:strings（默认值为”round\_prefer\_floor”）

目前不支持设置支持说明 目前仅支持宽高方向的整数倍缩放,且缩放倍数为2-8的整数倍,如果是(1,c,1,1)则支持放大到(1,c,h, w)

52

<!-- page 53 of 374 -->

## Slice

获得当前向量的一个切片，具体规则和[numpy切片](https://numpy.org/doc/stable/user/basics.indexing.html)相同

输入列表

input\_tensor:T

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T:int8(Tensor),float16(Tensor)

属性列表

starts:int(Tensor)

切分的起始位置:无限制

ends:int(Tensor)切分的终止位置:无限制

axes:int(Tensor)

选取切分的轴:支持任意0\~3轴，支持同时多轴选择

steps:int(Tensor)

选取切分对应轴的步长

当height\*width==1&&channel%subc==0&&starts[1]%subc==0&&ends[1]% subc==0&&steps[1]<=subc时,steps可以不为1，否则只有steps==[1,1,1,1]时，才可通过NPU运行SliceOP

## Split

将向量沿着axis方向分成num\_outputs个向量，split用于指定切分后向量在axis方向上的大小

输入列表

53

<!-- page 54 of 374 -->

## input\_tensor:T

shape:[batch,channel,height,width]

量化支持per-layer

## 输出列表

output:T

一或多个输出向量，由num\_outputs属性决定

shape:根据切分情况决定

量化支持per-layer

数据类型约束

T:int8(Tensor),float16(Tensor)

属性列表

axis:int axis∈{0,1,2,3}

num\_outputs:int

split:int(Tensor)

## Sub

执行元素级二进制减法(C=A-B),支持多向Numpy样式的广播

输入列表

A:T1,T2

shape:[batch,channel,height,width]

量化支持per-layer

广播支持[b,c,1,1] [scalar]

B:T1,T2

shape:[batch,channel,height,width]

量化支持

54

<!-- page 55 of 374 -->

per-layer

广播支持[b,c,1,1] [scalar]

## 输出列表

C:T1

shape:[batch,channel,height,width]

量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(constTensor)

## Tile

通过平铺给定的张量构造张量,这与Numpy中的函数tile相同，但没有广播

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持per-layer

repeats:T2 shape:[batch,channel,height,width]

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:int64(Tensor)

55

<!-- page 56 of 374 -->

## Transpose

对输入张量进行转置

输入列表

X:T1 shape:[n1,c1,h1,w1]详细约束规则见属性列表量化支持per-layer

输出列表

Y:T1,T2 shape:[n2,c2,h2,w2]详细约束规则见属性列表量化支持per-layer

## 属性列表

perm转置的轴顺序: 不同perm参数限制如下:(其中p=8192,q=2048) perm=[0,1,2,3]无限制perm=[0,1,3,2]不支持perm=[0,2,3,1]不支持perm=[0,2,1,3]不支持perm=[0,3,1,2]不支持perm=[0,3,2,1]不支持perm=[1,0,2,3]不支持perm=[1,0,3,2]

56

<!-- page 57 of 374 -->

不支持

perm=[1,2,0,3]不支持

perm=[1,2,3,0]不支持

perm=[1,3,0,2]不支持

perm=[1,3,2,0]不支持

perm=[2,1,0,3] $\circ \mathsf { T } \mathsf { 1 } \mathsf { , } \mathsf { T } \mathsf { 2 } \mathsf { : } \mathsf { c } \mathsf { 1 } \mathsf { < } \mathsf { 8 } \mathsf { 1 } \mathsf { 9 } \mathsf { 2 } \mathsf { , } \mathsf { n } \mathsf { < } \mathsf { 8 } \mathsf { 1 } \mathsf { 9 } \mathsf { 2 } \mathsf { , } \mathsf { h } \mathsf { 1 } \mathsf { * } \mathsf { w } \mathsf { 1 } \mathsf { < } \mathsf { 8 } \mathsf { 1 } \mathsf { 9 } \mathsf { 2 } \mathsf { , } \mathsf { ( } \mathsf { h } \mathsf { 1 } \mathsf { = } \mathsf { w } \mathsf { 1 } \mathsf { = } \mathsf { 1 } \mathsf { , } \mathsf { n } \mathsf { 1 } \mathsf { \% } \mathsf { 4 } \mathsf { = } \mathsf { 0 } \mathsf { ) } \mathsf { o r } \mathsf { ( } \mathsf { n } \mathsf { 1 } \mathsf { = } \mathsf { h } \mathsf { 1 } \mathsf { = } \mathsf { 1 } \mathsf { , } \mathsf { h } \mathsf { 1 } \mathsf { \% } \mathsf { 4 } \mathsf { = } \mathsf { 0 } \mathsf { ) }$

perm=[2,1,3,0] $\circ \mathsf { T } \mathsf { 1 } \mathsf { , } \mathsf { T } \mathsf { 2 } \mathsf { : } \mathsf { c } \mathsf { 1 } \mathsf { < } \mathsf { 8 } \mathsf { 1 } \mathsf { 9 } \mathsf { 2 } \mathsf { , } \mathsf { n } \mathsf { < } \mathsf { 8 } \mathsf { 1 } \mathsf { 9 } \mathsf { 2 } \mathsf { , } \mathsf { h } \mathsf { 1 } \mathsf { * } \mathsf { w } \mathsf { 1 } \mathsf { < } \mathsf { 8 } \mathsf { 1 } \mathsf { 9 } \mathsf { 2 } \mathsf { , } \mathsf { ( } \mathsf { h } \mathsf { 1 } \mathsf { = } \mathsf { w } \mathsf { 1 } \mathsf { = } \mathsf { 1 } \mathsf { , } \mathsf { n } \mathsf { 1 } \mathsf { \% } \mathsf { 4 } \mathsf { = } \mathsf { 0 } \mathsf { ) } \mathsf { o r } \mathsf { ( } \mathsf { n } \mathsf { 1 } \mathsf { = } \mathsf { h } \mathsf { 1 } \mathsf { = } \mathsf { 1 } \mathsf { , } \mathsf { h } \mathsf { 1 } \mathsf { \% } \mathsf { 4 } \mathsf { = } \mathsf { 0 } \mathsf { ) }$

perm=[2,0,3,1]不支持

perm=[2,0,1,3]不支持

perm=[2,3,1,0]不支持

perm=[2,3,0,1]不支持

perm=[3,0,2,1]不支持

perm=[3,0,1,2]不支持

perm=[3,2,0,1]不支持

perm=[3,2,1,0]不支持

perm=[3,1,0,2] $\circ \mathsf { T } \mathsf { 1 } \mathsf { , } \mathsf { T } \mathsf { 2 } \mathsf { : } \mathsf { c } \mathsf { 1 } \mathsf { < } \mathsf { 8 } \mathsf { 1 } \mathsf { 9 } \mathsf { 2 } \mathsf { , } \mathsf { n } \mathsf { < } \mathsf { 8 } \mathsf { 1 } \mathsf { 9 } \mathsf { 2 } \mathsf { , } \mathsf { h } \mathsf { 1 } \mathsf { * } \mathsf { w } \mathsf { 1 } \mathsf { < } \mathsf { 8 } \mathsf { 1 } \mathsf { 9 } \mathsf { 2 } \mathsf { , } \mathsf { ( } \mathsf { h } \mathsf { 1 } \mathsf { = } \mathsf { w } \mathsf { 1 } \mathsf { = } \mathsf { 1 } \mathsf { , } \mathsf { n } \mathsf { 1 } \mathsf { \% } \mathsf { 4 } \mathsf { = } \mathsf { 0 } \mathsf { ) } \mathsf { o r } \mathsf { ( } \mathsf { n } \mathsf { 1 } \mathsf { = } \mathsf { h } \mathsf { 1 } \mathsf { = } \mathsf { 1 } \mathsf { , } \mathsf { w } \mathsf { 1 } \mathsf { \% } \mathsf { 4 } \mathsf { = } \mathsf { 0 } \mathsf { ) }$

perm=[3,1,2,0] o $\mathsf { T 1 } { , } \mathsf { T 2 } { : } \mathsf { c 1 } { < } \mathsf { 8 1 9 2 } { , } \mathsf { n } { < } \mathsf { 8 1 9 2 } { , } \mathsf { h 1 } { * } \mathsf { w 1 } { < } \mathsf { 8 1 9 2 } { , } \mathsf { ( h 1 } { = } \mathsf { w 1 } { = } \mathsf { 1 } { , } \mathsf { n 1 } { \% } 4 { = } \mathsf { 0 } { ) } \mathsf { o r } \mathsf { ( n 1 } { = } \mathsf { h 1 } { = } \mathsf { 1 } { , } \mathsf { w 1 } { \% } 4 { = } \mathsf { 0 } { ) }$

## 数据类型约束

57

<!-- page 58 of 374 -->

T1:int8(Tensor)

T2:int16(Tensor),float16(Tensor)

## 其他支持

多核联合:暂不支持

## Sigmoid

给定输入张量，函数y=1/(1+exp(-x))按元素应用于输入张量，得到输出张量

输入列表

input:T1 shape:[batch,channel,height,width]量化支持per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## Tanh

计算给定输入张量单元的双曲正切

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

58

<!-- page 59 of 374 -->

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## Softplus

按元素应用Softplus函数,y=ln(exp(x)+1)

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## HardSigmoid

给定输入张量，函数y=max(0,min(1,alpha\*x+beta))按元素应用于输入张量，得到输出张量，这里alpha=1/6，beta=0.5

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

59

<!-- page 60 of 374 -->

T1:int8(Tensor),float16(Tensor)

## HardSwish

按元素应用 HardSwish 函数, y = x \* max(0, min(1, alpha \* x + beta)) = x \* HardSigmoid(x),这里${ \mathsf { a l p h a } } { = } 1 / 6 { , } { \mathsf { b e t a } } { = } 0 . 5$

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

## Elu

给定输入张量，函数f(x)=alpha\*(exp(x)-1.)forx<0,f(x)=xforx>=0按元素应用于输入张量，得到输出张量，这里alpha=1

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

60

<!-- page 61 of 374 -->

T1:int8(Tensor),float16(Tensor)

## exSwish

按元素应用Sigmoid线性单元函数,Swish函数也称为SiLU函数,y=x\*sigmoid(x)

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

## exMish

给定输入张量，函数mish(x)=x**tanh(softplus(x))=x**tanh(ln(1+e^{x}))按元素应用于输入张量，得到输出张量

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

61

<!-- page 62 of 374 -->

## exGelu

给定输入张量，函数y =qx∗Φ(x)按元素应用于输入张量，得到输出张量，当Φ(x)函数设置成tanh时， y =0.5∗x∗(1+Tanh( 2 ∗(x+0.044715∗x3))) π

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## exSwooshR

给定输入张量，按论文[https://arxiv.org/abs/2310.11230](https://arxiv.org/abs/2310.11230)给定的下列函数，按元素应用于输入张量，得到输出张量 SwooshR(x)=log(1+exp(x-1))-0.08x-0.313261687

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

62

<!-- page 63 of 374 -->

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## exSwooshL

给定输入张量，按论文[https://arxiv.org/abs/2310.11230](https://arxiv.org/abs/2310.11230)给定的下列函数，按元素应用于输入张量，得到输出张量 SwooshL(x)=log(1+exp(x-4))-0.08x-0.035

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## Where

根据mask\_tensor获取x\_tensor或y\_tensor的值，当mask\_tensor位置为True时，取x\_tensor对应位置的值，否则取y\_tensor的值。

输入列表

mask\_tensor:T1

shape:[batch,channel,height,width]

广播支持

支持任意维度广播操作

广播约束

广播约束同Expand算子

x\_tensor:\*T2

shape:[batch,channel,height,width]

63

<!-- page 64 of 374 -->

## 量化支持

per-layer

广播支持

支持任意维度广播操作

广播约束

广播约束同Expand算子

y\_tensor:T1

shape:[batch,channel,height,width]

量化支持

per-layer

广播支持

支持任意维度广播操作

广播约束

广播约束同Expand算子

输出列表

output:T2 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

T1:bool(Tensor)

T2:int8(Tensor),float16(Tensor)

## exGlu

门控线性单元(GatedLinearUnit)函数,其中a是输入矩阵的前一半,b是后一半 GLU(a,b)=a⊗σ(b)

输入列表

Input:T1

shape:[batch,channel,height,width]

量化支持:per-layer

## 输出列表

Output:T1

64

<!-- page 65 of 374 -->

```txt
- shape:[batch,channel/2,height,width]
```

量化支持:per-layer

## 数据类型约束

```txt
- T1:int8(Tensor),float16(Tensor)
```

属性列表

axis:int(默认值=1)

分割输入的维度

约束:仅支持1

## exMatMul

矩阵乘法操作

$$
Y = \left\{ \begin{array}{l l} A \cdot B + C & \text {if c\_type = "add"} \\ A \cdot B * C & \text {if c\_type = "mul"} \end{array} \right.
$$

## 输入列表

A:T1 shape:[b,k,1,n] k ∈(0,8192]量化支持per-layer

B:T1 shape:[b,k,1,m]量化支持per-layer

C(optional):T1,T2 shape:[b,n,1,m]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

## 输出列表

65

<!-- page 66 of 374 -->

Y:T1

shape:[b,n,1,m]

量化支持

per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

属性列表

c\_type:strings(默认值“add”)

支持add和mul可选,表示C是做加法还是乘法

## exNorm

对输入数据进行各种归一化操作，目 前支持LayerNormalization、RMSNormalization和MeanVarianceNormalization三种:

$$
\text {LayerNorm} (x) = \frac {x - \mu}{\sqrt {\sigma^ {2} + \epsilon}} \cdot W + B
$$

$$
\mathrm{RMSNorm} (x) = \frac {x}{\sqrt {\mathrm{RMS} ^ {2} + \epsilon}} \cdot W + B
$$

$$
\text {MeanVarianceNorm} (x) = \frac {x - \mu}{\sqrt {\text {Variance} + \epsilon}} \cdot W + B
$$

其中: x是输入向量。 µ和 $\mathtt { U } ^ { 2 }$ 分别是输入向量的均值和方差:

$$
\mu = \frac {1}{H} \sum_ {i = 1} ^ {H} x _ {i}
$$

$$
\sigma^2 = \frac{1}{H}\sum_{i = 1}^{H}(x_i - \mu)^2
$$

RMS是输入向量均方根:

$$
\text {RMS} = \sqrt {\frac {1}{H} \sum_ {i = 1} ^ {H} x _ {i} ^ {2}}
$$

66

<!-- page 67 of 374 -->

Variance是输入向量的等效方差:

$$
\text {Variance} = \frac {1}{H} \sum_ {i = 1} ^ {H} x _ {i} ^ {2} - \mu^ {2}
$$

ϵ是一个很小的数，用于防止除零操作。 W 和B是可选择的参数。

输入列表

X:T1

shape:[batch,channel,height,width]

W(optional):T1

shape:[batch,channel,height,width]

B(optional):T1

shape:[batch,channel,height,width]

输出列表

Y:T1

shape:[batch,channel,height,width]

数据类型约束

T1:float16(Tensor)

属性列表

epsilon:float(默认值1e-05)

用来防止除0的epsilon数值

mode:string

支持layer、rms和mean\_var三种Normalization模式可选

axes:int64[](默认值[1])

归一化轴，目前只支持[1]和[1,2,3]

其他支持

多核联合:尚不支持

## exWindow

exWindow来源于[swin\_transformer](https://github.com/microsoft/Swin-Transformer/blob/main/models/swin_transformer.py)的window\_partition和window\_reverse操作。 原论文中输入特征被划分为多个不重叠的窗口，每个窗口的大小为window\_size× window\_size。要求输入和输出特征都为4维shape，在高和宽方向上都进行划分。 pytorch实现的计算方法如下:

67

<!-- page 68 of 374 -->

```python
def window_partition(x, window_size):
    """
    Args:
        x: (B, C, H, W)
        window_size (int): window size
    Returns:
        windows: (B, C, num_windows * num_windows, window_size * window_size)
    """
    B, C, H, W = x.shape
    x = x.view(B, C, H // window_size, window_size, W // window_size, window_size)
    windows = x.permute(0, 1, 2, 4, 3, 5).contiguous().view(B, C, -1, window_size * window_size)
    return windows

def window_reverse(windows, window_size, H, W):
    """
    Args:
        windows: (B, C, num_windows * num_windows, window_size * window_size)
        window_size (int): Window size
        H (int): Height of image
        W (int): Width of image
    Returns:
        x: (B, C, H, W)
    """
    B, C, _, _ = windows.shape
    x = windows.view(B, C, H // window_size, W // window_size, window_size, window_size)
    x = x.permute(0, 1, 2, 4, 3, 5).contiguous().view(B, C, H, W)
    return x
```

```txt
输入列表

• X:T1
    • shape:[batch,channel,height,width]

输出列表

• Y:T1
    • shape:[batch,channel,height,width]

数据类型约束

• T1:int8(Tensor),float16(Tensor)

属性列表

• mode:string
    • 支持模式:partition,reverse,partition_num_first
        • partition:参考window_partition实现;
        • reverse:参考window_reverse实现;
        • partition_num_first: 与 partition 的区别在于，partition_num_first 的 H,W 按照 num_windows进行划分，而partition的H,W按照window_sizes进行划分。
```

68

<!-- page 69 of 374 -->

window\_sizes:listofints

2维向量,窗口的大小。定义了每个窗口的高度和宽度。窗口内的注意力计算和特征提取都是基于这个大小。

num\_windows:listofints

2维向量,窗口的数量。定义了输入特征的高度和宽度被划分为多少个窗口。

## 其他支持

多核联合:尚不支持

## RK3588

## Add

执行元素级二进制加法(C=A+B),支持多向Numpy样式的广播

输入列表

A:T1,T2 shape:[batch,channel,height,width]

量化支持per-layer

广播支持支持任意维度广播操作广播约束同Expand算子

B:T1,T2

shape:[batch,channel,height,width]

量化支持per-layer

广播支持支持任意维度广播操作广播约束同Expand算子

输出列表

C:T1 shape:[batch,channel,height,width]量化支持per-layer

69

<!-- page 70 of 374 -->

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(constTensor)

## 其他支持

多核联合:支持

## AddRelu

```txt
Add与Relu融合计算,C=Relu(A+B)
输入列表
    - 同Add
输出列表
    - 同Add
其他支持
    - 多核联合:支持
```

## BatchNormalization

按照论文[https://arxiv.org/abs/1502.03167](https://arxiv.org/abs/1502.03167)中的描述对输入张量进行批量归一化计算

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

70

<!-- page 71 of 374 -->

## 属性列表

epsilon:float（默认值=1e-5）

除以标准差时加上防止除0的实数

epsilon∈(0,∞]

momentum:float

训练时的滑动平均参数

其他支持

多核联合:尚不支持

## Concat

将一系列向量在axis指定的方向上组合成一个向量，所有向量除axis指定的方向外大小必须相同输入列表

input\_tensor:T

量化支持per-layer

输出列表

output:T

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T:int8(Tensor),float16(Tensor)

属性列表

axisint64

axis∈{0,1,2,3}

## Convolution

卷积

输入列表

71

<!-- page 72 of 374 -->

## input\_tensor:T1

shape:[batch,channel,height,width]

width: 当dilated\_kernel\_h>1时,width<16383。此外,对首层输入width存在限制，详见模型输入说明。

量化支持

per-layer

weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,31]

kernel\_w∈[1,31]

量化支持

per-layer

per-channel

## 输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 属性列表

strides:int(strides\_h,strides\_w)

stride\_h∈[1,7]

stride\_w∈[1,7]

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right)

pads\_top∈[0,15]

pads\_left∈[0,15]

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,31]

dilations\_w∈[1,31]

## 数据类型约束

72

<!-- page 73 of 374 -->

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:支持

## Depthwise Convolution

深度可分离卷积

输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

width: 当dilated\_kernel\_h>1时,width<16383。此外,对首层输入width存在限制，详见模型输入说明。

量化支持

per-layer

weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,8]

kernel\_w∈[1,8]

量化支持

per-layer

per-channel

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

属性列表

strides:int(strides\_h,strides\_w)

stride\_h∈[1,7]

stride\_w∈[1,7]

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right)

pads\_top∈[0,15]

pads\_left∈[0,15]

73

<!-- page 74 of 374 -->

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,32]

dilations\_w∈[1,32]

数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:支持

## ConvolutionRelu

Convolution与Relu融合计算,Output=Relu(Conv(Input)) 说明及规格限制同Convolution

其他支持

多核联合:支持

## ConvolutionClip

Convolution与Clip融合计算,Output=Clip(Conv(Input)) 说明及规格限制同Convolution

其他支持

多核联合:支持

## ConvolutionPRelu/LeakyRelu

Convolution 与 PRelu/LeakyRelu 融合计算, Output = PRelu(Conv(Input)) 或者 Output = LeakyRelu(Conv(Input)) 说明及规格限制同Convolution

其他支持

多核联合:支持

## ConvolutionAdd

Convolution与Add融合计算,Output=Add(Conv(Input0),Input1) 说明及规格限制同Convolution

其他支持

多核联合:支持

74

<!-- page 75 of 374 -->

## ConvolutionSigmoid

Convolution与Sigmoid融合计算,Output=Sigmoid(Conv(Input)) 说明及规格限制同Convolution其他支持

多核联合:暂不支持

## ConvolutionTanh

Convolution与Tanh融合计算,Output=Tanh(Conv(Input)) 说明及规格限制同Convolution其他支持

多核联合:暂不支持

## ConvolutionSoftplus

Convolution与Softplus融合计算, $,Output=Softp!u5(Conv(Input))$ 说明及规格限制同Convolution其他支持

多核联合:暂不支持

## ConvolutionHardSigmoid

Convolution与HardSigmoid融合计算,Output=HardSigmoid(Conv(Input)) 说明及规格限制同Convolution

其他支持

多核联合:暂不支持

## ConvolutionHardSwish

Convolution与HardSwish融合计算,Output=HardSwish(Conv(Input)) 说明及规格限制同Convolution其他支持

多核联合:暂不支持

## ConvolutionElu

Convolution与Elu融合计算,Output=Elu(Conv(Input)) 说明及规格限制同Convolution

其他支持

75

<!-- page 76 of 374 -->

多核联合:暂不支持

## ConvolutionSwish

Convolution与Swish融合计算,Output=Swish(Conv(Input)) 说明及规格限制同Convolution

其他支持

多核联合:暂不支持

## ConvolutionMish

Convolution与Mish融合计算,Output=Mish(Conv(Input)) 说明及规格限制同Convolution其他支持

多核联合:暂不支持

## ConvolutionAddRelu

Convolution与Add及Relu融合计算,Output=Relu(Add(Conv(Input0),Input1)) 说明及规格限制同Convolution

其他支持

多核联合:支持

## ConvTranspose

转置卷积

输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

width: 当dilated\_kernel\_h>1时,width<16383。此外,对首层输入width存在限制，详见模型输入说明。

量化支持

per-layer

weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,31]

kernel\_w∈[1,31]

76

<!-- page 77 of 374 -->

## 量化支持

per-layer

per-channel

## 输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 属性列表

strides:int(strides\_h,strides\_w)

stride\_h仅支持1,2,4,8

stride\_w仅支持1,2,4,8

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right) 设置pad时注意: 不支持kernel\_h**dilations\_h-dilations\_h-pads\_top<0** 不支持**kernel\_w**dilations\_w-dilations\_wpads\_left<0 不支持stride\_h**(height-1)-pads\_top+1<output\_h** 不支持**stride\_w**(width-1)- pads\_left+1<output\_w

pads\_top∈[0,15]

pads\_left∈[0,15]

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

group:仅支持1,当且仅当num\_input=num\_output时支持num\_output

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,32]

dilations\_w∈[1,32]

当dilation不等于(1,1)时，只支持kernel=(1,1)

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:暂不支持

## ConvTranposeRelu

77

<!-- page 78 of 374 -->

ConvTranpose与Relu融合计算,Output=Relu(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeClip

ConvTranpose与Clip融合计算,Output=Clip(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposePRelu/LeakyRelu

ConvTranpose与PRelu/LeakyRelu融合计算,Output=PRelu(ConvTranpose(Input))或者Output= LeakyRelu(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeAdd

ConvTranpose与Add融合计算,Output=Add(ConvTranpose(Input0),Input1) 说明及规格限制同

ConvTranspose

## ConvTranposeSigmoid

ConvTranpose与Sigmoid融合计算,Output=Sigmoid(ConvTranpose(Input)) 说明及规格限制同

ConvTranspose

## ConvTranposeTanh

ConvTranpose与Tanh融合计算,Output=Tanh(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeSoftplus

ConvTranpose与Softplus融合计算,Output=Softplus(ConvTranpose(Input)) 说明及规格限制同

ConvTranspose

## ConvTranposeHardSigmoid

ConvTranpose与HardSigmoid融合计算,Output=HardSigmoid(ConvTranpose(Input))

## ConvTranposeHardSwish

ConvTranpose与HardSwish融合计算,Output=HardSwish(ConvTranpose(Input)) 说明及规格限制同

ConvTranspose

78

<!-- page 79 of 374 -->

## ConvTranposeElu

ConvTranpose与Elu融合计算,Output=Elu(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeSwish

ConvTranpose与Swish融合计算,Output=Swish(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeMish

ConvTranpose与Mish融合计算,Output=Mish(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## Div

执行元素级二进制除法(C=A/B),支持多向Numpy样式的广播

输入列表

A:T1,T2 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

B:T1,T2 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

输出列表

C:T1 shape:[batch,channel,height,width]量化支持

79

<!-- page 80 of 374 -->

per-layer

## 数据类型约束

T1:float16(Tensor)

T2:float(constTensor)

其他支持

多核联合:不支持

## Expand

根据给定的 shape 和广播规则广播输入张量。广播规则类似于 numpy.array(input) \* numpy.ones(shape):维度右对齐；两个对应维度必须具有相同的值，或者其中一个等于1

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

shape:T2

shape:[batch,channel,height,width]

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:int64(Tensor)

## 广播约束

[b,c,1,w]->[b,c,h,w],h∈[1,8192]

[b,1,1,w]->[b,c,h,w],h∈[1,8192]

[b,c,h,1]->[b,c,h,w],w ∈[1,8192]

[b,1,h,1]->[b,c,h,w],w ∈[1,8192]

[b,c,1,1]->[b,c,h,w],h∈[1,8192],w ∈[1,8192]

80

<!-- page 81 of 374 -->

## 其他支持

多核联合:不支持

## GRU

门控循环单元（GRU，GatedRecurrentUnit） GRU扩展以及变体命名为exGRU算子，参数项中指明（extern）的项为exGRU独有的参数项。 计算公式如下: Equations(Default:f=Sigmoid,g=Tanh): r\_t = f(x\_t · W\_r + h\_{t−1} · R\_r + Wb\_r + Rb\_r) z\_t = f(x\_t · W\_z + h\_{t−1} · R\_z + Wb\_z + Rb\_z) h\_t = g(x\_t · W\_h + (r\_t ⊙ h\_{t−1}) · R\_h + Rb\_h + Wb\_h), (WRB=0) h\_t = g(x\_t · W\_h + r\_t ⊙ (h\_{t−1} · R\_h + Rb\_h)) + Wb\_h, (WRB=1) H\_t = (1 − z\_t) ⊙ h\_t + z\_t ⊙ h\_{t−1}

输入列表

X:T1

shape:[seq\_length,batch\_size,input\_size]

seqlength∈(0,8192]

batchsize∈(0,8192],大于1时仅支持4的倍数

inputsize∈(0,8192]

量化支持

per-layer

W:T1

shape:[num\_directions,4\*hidden\_size,input\_size]

inputsize∈(0,8192]

hiddensize∈(0,8192]

numdirections:1or2

量化支持

per-layer

per-channel

R:T1

shape:[num\_directions,4\*hidden\_size,hidden\_size]

hiddensize∈(0,8192]

numdirections:1or2

量化支持

per-layer

per-channel

B:T2

shape:[num\_directions,8\*hidden\_size]

81

<!-- page 82 of 374 -->

hiddensize∈(0,8192]

numdirections:1or2

量化支持

per-layer

per-channel

sequence\_lens:T3(optional)

shape:[batch\_size]

batchsize∈(0,8192],大于1时仅支持4的倍数

initial\_h:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

## 输出列表

Y:T1

shape:[seq\_length,num\_directions,batch\_size,hidden\_size]

seqlength∈(0,8192]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

Y\_h:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

## 属性列表

82

<!-- page 83 of 374 -->

linear\_before\_reset:int

LBR变种的选择:1(T)or0(F)

direction(extern):string

指定GRU的运算方向

forward:指定GRU的运算方向为前向

reverse:指定GRU的运算方向为反向

bidirectional:指定GRU的运算方向为双向

sequence\_size(extern):int

指定GRU输入的seqsize，无限制，建议4对齐

hidden\_size(extern):int

GRU单元中的hiddensize，无限制，建议8对齐

input\_layout(extern):int

指定与对应输入shape含义一致的layout

要求填写指定的layout，同时要求填写该op实际对应的batch\_size、sequence\_size、hidden\_size。

snc:指定layout对应的输入shape为[seqs,batches,input\_size]

(sn)c:指定layout对应的输入shape为[seqs\*batches,input\_size,1,1]

output\_layout(extern):int

指定与对应输出shape含义一致的layout

要求填写指定的layout，同时要求填写该op实际对应的batch\_size、sequence\_size、hidden\_size、directions。

sbnc:指定layout对应的输出shape为[seqs,directions,batches,hidden\_size]

(sn)c:指定layout对应的输出shape为[seqsbatches,directionsinput\_size,1,1]

## 数据类型约束

T1:float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

其他支持

多核联合:暂不支持

## Gather

根据索引Indices获取输入X的指定axis维度的条目，并将它们拼接在一起。

输入列表

X:T1

83

<!-- page 84 of 374 -->

shape:[batch,channel,height,width]

量化支持

per-layer

Indices:T2

要收集的元素的索引，秩rank =1

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:int(Tensor)

属性列表

axis:int(Tensor)

axis∈{0,1,2,3}

指定Indices获取输入的维度

## 其他支持

多核联合:尚不支持

## Hardmax

输入列表

input:T1

shape:[batch,channel,height,width]

axis=1,height∗width<16384;

axis=3/-1,channel∗height<16384,且受限于transpose的规格限制

输出列表

output:T1

shape:[batch,channel,height,width]

84

<!-- page 85 of 374 -->

## 数据类型约束

```txt
- T1:int8(Tensor),float16(Tensor)
```

属性列表

```txt
- axis:int
```

做hardmax的轴:1,3/-1，即channel和width方向

其他支持

多核联合:尚不支持

## LSTM

长短期记忆网络（LSTM，Long Short-Term Memory） LSTM扩展以及变体命名为exLSTM算子，参数项中指明 （extern）的项为exLSTM独有的参数项。 计算公式如下:

```python
Equations(Default:f=Sigmoid,g=Tanh,h=Tanh): i_t = f(x_t · W_i + h_{t-1} · R_i + Wb_i + Rb_i) f_t
= f(x_t · W_f + h_{t-1} · R_f + Wb_f + Rb_f) c_t = f(x_t · W_c + h_{t-1} · R_c + Wb_c + Rb_c)
o_t = f(x_t · W_o + h_{t-1} · R_o + Wb_o + Rb_o) C_t = f_t ⊙ C_{t-1} + i_t ⊙ c_t h_t = o_t ⊙
h(C_t)
```

输入列表

```python
• X:T1
    • shape:[seq_length,batch_size,input_size]
        • seqlength∈(0,8192]
        • batchsize∈(0,8192],大于1时仅支持4的倍数
        • inputsize∈(0,8192)
    • 量化支持
        • per-layer
• W:T1
    • shape:[num_directions,4*hidden_size,input_size]
        • inputsize∈(0,8192]
        • hiddensize∈(0,8192]
        • numdirections:1or2
    • 量化支持
        • per-layer
        • per-channel
• R:T1
    • shape:[num_directions,4*hidden_size,hidden_size]
```

85

<!-- page 86 of 374 -->

- hiddensize∈(0,8192]
- numdirections:1or2
- 量化支持
- per-layer
- per-channel
- B:T2,T3
- shape:[num\_directions,8\*hidden\_size]
- hiddensize∈(0,8192]
- numdirections:1or2
- 量化支持
- per-layer
- per-channel
- sequence\_lens:T4,T5(optional)
- shape:[batch\_size]
- batchsize∈(0,8192),大于1时仅支持4的倍数
- initial\_h:T1(optional)
- shape:[num\_directions,batch\_size,hidden\_size]
- numdirections:1or2
- batchsize∈(0,8192),大于1时仅支持4的倍数
- hiddensize∈(0,8192)
- 量化支持
- per-layer
- initial\_c:T1(optional)
- shape:[num\_directions,batch\_size,hidden\_size]
- numdirections:1or2
- batchsize∈(0,8192),大于1时仅支持4的倍数
- hiddensize∈(0,8192)
- 量化支持
- per-layer

输出列表

Y:T1

shape:[seq\_length,num\_directions,batch\_size,hidden\_size]

seqlength∈(0,8192]

86

<!-- page 87 of 374 -->

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

## 量化支持

per-layer

Y\_h:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

Y\_c:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

## 属性列表

direction(extern):string

指定LSTM的运算方向

forward:指定LSTM的运算方向为前向

reverse:指定LSTM的运算方向为反向

bidirectional:指定LSTM的运算方向为双向

sequence\_size(extern):int

指定LSTM输入的seqsize，无限制，建议4对齐

hidden\_size(extern):int

LSTM单元中的hiddensize，无限制，建议8对齐

proj\_size(extern):int

projection时的proj\_size，projsize∈[0,hiddensize]

目前限定0，即尚不支持projection功能

input\_forget(extern):int

cifg变种的选择:1(T)or0(F) 目 前限定0，即尚不支持

87

<!-- page 88 of 374 -->

has\_projection(extern):int

projection变种:1(T)or0(F) 目 前限定0，即尚不支持

input\_layout(extern):int

指定与对应输入shape含义一致的layout

要求填写指定的layout，同时要求填写该op实际对应的batch\_size、sequence\_size、hidden\_size。

snc:指定layout对应的输入shape为[seqs,batches,input\_size]

(sn)c:指定layout对应的输入shape为[seqs\*batches,input\_size,1,1]

output\_layout(extern):int

指定与对应输出shape含义一致的layout

要求填写指定的layout，同时要求填写该op实际对应的batch\_size、sequence\_size、hidden\_size、directions。

sbnc:指定layout对应的输出shape为[seqs,directions,batches,hidden\_size]

(sn)c:指定layout对应的输出shape为[seqsbatches,directionsinput\_size,1,1]

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:int32(Tensor)

T4:float(Scalar)

T5:int(Scalar)

## 其他支持

多核联合:暂不支持

## Max

计算输入张量的元素级最大值

输入列表

A:T1

shape:[batch,channel,height,width]

量化支持

per-layer

广播支持

支持任意维度广播操作

广播约束同Expand算子

B:T1

88

<!-- page 89 of 374 -->

shape:[batch,channel,height,width]

量化支持per-layer

广播支持支持任意维度广播操作广播约束同Expand算子

## 输出列表

C:T1 shape:[batch,channel,height,width]量化支持per-layer/per-channel

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

## 多核联合:暂不支持

## Min

## 计算输入张量的元素级最小值

## 输入列表

A:T1 shape:[batch,channel,height,width]

量化支持per-layer

广播支持支持任意维度广播操作广播约束同Expand算子

B:T1 shape:[batch,channel,height,width]量化支持per-layer广播支持

89

<!-- page 90 of 374 -->

支持任意维度广播操作广播约束同Expand算子

## 输出列表

C:T1 shape:[batch,channel,height,width]量化支持per-layer/per-channel

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:暂不支持

## Mul

执行元素级二进制乘法(C=A\*B),支持多向Numpy样式的广播

输入列表

A:T1,T2 shape:[batch,channel,height,width]

量化支持per-layer

广播支持支持任意维度广播操作广播约束同Expand算子

B:T1,T2 shape:[batch,channel,height,width]

量化支持per-layer

广播支持支持任意维度广播操作广播约束同Expand算子

## 输出列表

90

<!-- page 91 of 374 -->

C:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(constTensor)

其他支持

多核联合:支持

## MulRelu

Mul与Relu融合计算,C=Relu(A\*B)

输入列表

同Mul

输出列表

同Mul

其他支持

多核联合:支持

## Pad

给定一个包含要填充的数据的张量(data),包含轴的开始和结束填充数值的张量(pads),模式(mode),常量数值(constant\_value), 生成一个填充张量(output)

输入列表

data:T1

shape:[batch,channel,height,width]

量化支持

per-layer

pads:T2

shape : [batch\_begin, channel\_begin, height\_begin, width\_begin, batch\_end, channel\_end,height\_end, width\_end]

constant\_value(optional):T3

91

<!-- page 92 of 374 -->

shape:[1]

量化支持

per-layer

## 输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:int64(Tensor)

T3:float(Scalar),int8(Scalar),float16(Scalar)

属性列表

mode:string(默认值constant)

支持模式:constant,reflect

constant无限制

reflectchannel∈(0,8192],height∈(0,8192],width∈(0,8176]

## 其他支持

多核联合:尚不支持

## MaxPool

MaxPool消耗输入张量X并根据内核大小、步幅大小和pad长度在张量上应用最大池化。最大池化包括根据内核大小计算输入张量子集的所有值的最大值，并将数据下采样到输出张量Y中以进行进一步处理。 输出空间形状的计算方式有所不同，具体取决于是否使用显式填充（在使用pads的情况下）或使用 自 动填充（在使用auto\_pad的情况下）。仅使用显式填充

输入列表

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

height∈(0,8192]

width∈(0,8192]

92

<!-- page 93 of 374 -->

## 输出列表

output:T1

shape:[batch,channel,height,width]

## 属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

kernel\_h∈(0,7]

kernel\_w∈(0,7]

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

storage\_order:int64

优先储存方式:0

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## GlobalMaxPool

GlobalMaxPool使用输入张量X并对同一通道中的值应用最大池化。这相当于MaxPool的kernel\_shape 大小等于input的空间维度。

输入列表

input:T1

93

<!-- page 94 of 374 -->

shape:[batch,channel,height,width]

channel∈(0,8192]

height∈(0,7]

width∈(0,7]

## 输出列表

output:T1

shape:[batch,channel,height,width]

## 属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

kernel\_h∈(0,7]

kernel\_w∈(0,7]

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## AveragePool

94

<!-- page 95 of 374 -->

AveragePool使用输入张量X并根据内核大小、步幅大小和pad长度在张量上应用平均池化。平均池化包括根据内核大小计算输入张量子集的所有值的平均值，并将数据下采样到输出张量Y中以进行进一步处理。输出空间形状的计算方式有所不同，具体取决于是否使用显式填充（在使用pads的情况下）或使用 自动填充（在使用auto\_pad的情况下）。仅使用显式填充

## 输入列表

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

height∈(0,8192]

width∈(0,8192]

输出列表

output:T1

shape:[batch,channel,height,width]

属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

kernel\_h∈(0,7]

kernel\_w∈(0,7]

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

95

<!-- page 96 of 374 -->

T2:float(Tensor)

T3:float(Scalar)

## GlobalAveragePool

GlobalAveragePool使用输入张量X并对同一通道中的值应用平均池化。这相当于AveragePool，其kernel\_shape大小等于输入张量的空间维度。

输入列表

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

height∈(0,7]

width∈(0,7]

输出列表

output:T1

shape:[batch,channel,height,width]

属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

kernel\_h∈(0,7]

kernel\_w∈(0,7]

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

96

<!-- page 97 of 374 -->

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## Pow

Z =XY 指数运算，采用输入数据（张量）和指数，并产生一个输出数据（张量）

输入列表

X:T1 shape:[batch,channel,height,width]量化支持per-layer

Y:T2 shape:[1]当前仅支持0、1、2、3、0.5、-0.5

输出列表

Z:T1 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:int8(Tensor),int32(Tensor),int64(Tensor),float16(Tensor),float(Tensor)

## 其他支持

## 多核联合:尚不支持

## Relu

将输入张量的负值设为零，正值保持不变

输入列表

input:T1

97

<!-- page 98 of 374 -->

shape:[batch,channel,height,width]

量化支持per-layer

广播支持无

## 输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:暂不支持

## Clip/ReLU6

将输入张量的值裁剪到[0,6]范围内

输入列表

input:T1 shape:[batch,channel,height,width]量化支持per-layer广播支持无

## 输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

98

<!-- page 99 of 374 -->

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:暂不支持

## PRelu

将输入张量的负值按可学习参数缩放，正值保持不变

输入列表

input:T1 shape:[batch,channel,height,width]量化支持per-layer/per-channel广播支持无

输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer/per-channel

属性列表

slope:PRelu系数仅支持单个标量或C维度系数

数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:暂不支持

## LeakyRelu

将输入张量的负值按固定比例缩放，正值保持不变

输入列表

99

<!-- page 100 of 374 -->

## input:T1

shape:[batch,channel,height,width]

量化支持per-layer

广播支持无

## 输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

## 多核联合:暂不支持

## Reshape

在不改变输入数据和元素数量的情况下，返回一个具有指定形状的张量。

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

100

<!-- page 101 of 374 -->

## 属性列表

shape:int指定输出张量的形状

## 其他支持

多核联合:尚不支持

## Resize

调整输入张量的大小。一般来说，它将输出张量中的每个值计算为输入张量中邻域（即采样位置）的加权平均值

输入列表

X:T1 shape:[batch,channel,height,width]量化支持per-layer

roi(optional):T2目前暂不支持

scales(optional):T2沿每个维度的缩放比例数组

sizes(optional):T3输出张量的目标大小

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:int64(Tensor)

## 属性列表

antialias:int（默认值为0）

101

<!-- page 102 of 374 -->

## 目前不支持设置

axes:int[]

目前不支持设置

coordinate\_transformation\_mode:strings（默认值为”half\_pixel”）

目 前仅支持half\_pixel，pytorch\_half\_pixel，align\_corners三种

cubic\_coeff\_a:float（默认为-0.75）

目前不支持设置

exclude\_outside:int（默认值为0）

目前不支持设置

extrapolation\_value:float（默认为0）

目前不支持设置

keep\_aspect\_ratio\_policy:strings（默认值为”stretch”）

目前不支持设置

mode:strings（默认值为”nearest”）

目 前仅支持nearest和linear两种可配置

nearest\_mode:strings（默认值为”round\_prefer\_floor”）

目前不支持设置支持说明 目前仅支持宽高方向的整数倍缩放,且缩放倍数为2-8的整数倍,如果是(1,c,1,1)则支持放大到(1,c,h, w)

多核联合:不支持

## Slice

获得当前向量的一个切片，具体规则和[numpy切片](https://numpy.org/doc/stable/user/basics.indexing.html)相同

输入列表

input\_tensor:T

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T

shape:[batch,channel,height,width]

量化支持

per-layer

102

<!-- page 103 of 374 -->

## 数据类型约束

```txt
• T:int8(Tensor),float16(Tensor)
属性列表
• starts:int(Tensor)
    • 切分的起始位置:无限制
• ends:int(Tensor)
    • 切分的终止位置:无限制
• axes:int(Tensor)
    • 选取切分的轴:支持任意0~3轴,支持同时多轴选择
• steps:int(Tensor)
    • 选取切分对应轴的步长
    • 当height*width==1&&channel%subc==0&&starts[1]%subc==0&&ends[1]%subc==0&&steps[1]<=subc时,steps可以不为1,否则只有steps==[1,1,1,1]时,才可通过NPU运行SliceOP
```

## Softmax

该运算符计算给定输入的归一化指数值:

```txt
Softmax(input, axis) = exp(input - max(input, axis)) / Σ_axis exp(input - max(input, axis))
```

“axis”属性表示Softmax执行的维度。输出张量具有相同的形状并包含相应输入的Softmax值。

输入列表

input:T1

shape:[batch,channel,height,width]

受限于transpose的规格限制

输出列表

output:T1

shape:[batch,channel,height,width]

数据类型约束

T1:int8(Tensor),float16(Tensor)

属性列表

axis:int

做softmax的轴:1,3，即channel和width方向

103

<!-- page 104 of 374 -->

## 其他支持

多核联合:尚不支持

## exSoftmax13

该运算符计算给定输入的归一化指数值:

```julia
exSoftmax13(input, axis) = exp(input - max(input, axis)) / Σ_axis exp(input - max(input, axis))
```

“axis”属性表示Softmax执行的维度。输出张量具有相同的形状并包含相应输入的Softmax值。

输入列表

```txt
- input:T1
    - shape:[batch,channel,height,width]
    - 受限于transpose的规格限制
```

输出列表

```yaml
- output:T1
  - shape:[batch,channel,height,width]
```

数据类型约束

```txt
- T1:int8(Tensor),float16(Tensor)
```

属性列表

```txt
- axis:int64
    - 做softmax的轴:1,3，即channel和width方向
```

其他支持

多核联合:尚不支持

## exSoftmaxMask

该运算符计算给定输入的归一化指数值:

$$
\begin{array}{c} \text {input} (x, m a s k _ {-} t, m a s k _ {-} v a l u e) = \left\{ \begin{array}{l l} x + (m a s k _ {t} - 1) * i n f & \text {if mask\_value = 0} \\ x + m a s k _ {t} * (- i n f) & \text {elif mask\_value = 1} \end{array} \right. \\ \text {exSoftmaxMask(input, axis)} = \frac {\exp (i n p u t - \max (i n p u t , a x i s))}{\sum_ {a x i s} \exp (i n p u t - \max (i n p u t , a x i s))} \end{array}
$$

104

<!-- page 105 of 374 -->

"axis"属性表示Softmax执行的维度。输出张量具有相同的形状并包含相应输入的Softmax值。

## 输入列表

input:T1

shape:[batch,channel,height,width]

受限于transpose的规格限制

mask(optional):T1

shape:[1,channel,height,width]

channel∈(0,8192]

width: · axis=1,无限制; · axis=3/-1,width∈(0,8192]

输出列表

output:T1

shape:[batch,channel,height,width]

数据类型约束

T1:int8(Tensor),float16(Tensor)

属性列表

axis:int64

做softmax的轴:1,3，即channel和width方向

mask\_value:int64

需要mask的值:0,1

其他支持

多核联合:尚不支持

## Split

将向量沿着axis方向分成num\_outputs个向量，split用于指定切分后向量在axis方向上的大小

输入列表

input\_tensor:T

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

105

<!-- page 106 of 374 -->

## output:T

一或多个输出向量，由num\_outputs属性决定

shape:根据切分情况决定

量化支持

per-layer

## 数据类型约束

T:int8(Tensor),float16(Tensor)

属性列表

axis:int axis∈{0,1,2,3}

num\_outputs:int

split:int(Tensor)

## Sub

执行元素级二进制减法(C=A-B),支持多向Numpy样式的广播

输入列表

A:T1,T2

shape:[batch,channel,height,width]

量化支持per-layer

广播支持[b,c,1,1] [scalar]

B:T1,T2

shape:[batch,channel,height,width]

量化支持per-layer

广播支持[b,c,1,1] [scalar]

## 输出列表

106

<!-- page 107 of 374 -->

C:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(constTensor)

## 其他支持

多核联合:不支持

## Tile

通过平铺给定的张量构造张量,这与Numpy中的函数tile相同，但没有广播

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持per-layer

repeats:T2

shape:[batch,channel,height,width]

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:int64(Tensor)

## 其他支持

多核联合:不支持

107

<!-- page 108 of 374 -->

## Transpose

对输入张量进行转置输入列表X:T1 shape:[n1,c1,h1,w1]详细约束规则见属性列表量化支持per-layer

输出列表

Y:T1,T2 shape:[n2,c2,h2,w2]详细约束规则见属性列表量化支持per-layer

属性列表

perm转置的轴顺序: 不同perm参数限制如下:(其中p=8192,q=2048) perm=[0,1,2,3]无限制perm=[0,1,3,2] T1:h1%16=0,h1**w1<16**p,h1**w1<2**q T2:h1%8=0,h1**w1<8**p,h1**w1<2**q perm=[0,2,3,1] T1:c1<8192,h1**w1%8=0**， **w1**c1<p\*16 T2:c1<8192,h1**w1%8=0**， **w1**c1<p\*8 perm=[0,2,1,3] T1:h1%16=0,h1**w1<16**p,h1**w1<2**q,c1\*w1<p T2:h1%8=0,h1**w1<8**p,h1**w1<2**q,c1\*w1<p perm=[0,3,1,2] T1,T2:h1**w1<p,w1<8192,h1**c1<p perm=[0,3,2,1] T1:h1%16=0,h1**w1<16**p,h1**w1<2**q,c1<p\*16 T2:h1%8=0,h1**w1<8**p,h1**w1<2**q,c1<p\*8

108

<!-- page 109 of 374 -->

perm=[1,0,2,3] T1:h1**w1<16**p,n1<8192,h1\*w1<p T2:h1**w1<8**p,n1<8192,h1\*w1<p perm=[1,0,3,2] T1:h1%16=0,c1**h1**w1<16**p,h1**w1<2\*q T2:h1%8=0,c1**h1**w1<8**p,h1**w1<2\*q perm=[1,2,0,3] T1:n1**w1<p**16,c1**h1**w1<p,w1%16=0 T2:n1**w1<p**8,c1**h1**w1p,w1%8=0 perm=[1,2,3,0] T1:h1**w1<p,n1<p**16,c1**h1**w1<p**16,n1**w1<p\*16 T2:h1**w1<p,n1<p**8,c1**h1**w1<p**8,n1**w1<p\*8 perm=[1,3,0,2] T1:c1**w1<8192,n1**h1<p,w1%16=0 T2:c1**w1<8192,n1**h1<p,w1%8=0 perm=[1,3,2,0] T1:c1**h1**w1<p,n1\*h1<p,w1<8192,w1%16=0 T2:c1**h1**w1<p,n1\*h1<p,w1<8192,w1%8=0 perm=[2,1,0,3] T1,T2:c1<8192,c1**h1**w1<p,n1\*w1<p perm=[2,1,3,0] T1:c1**h1**w1<p,n1**w1<p**16,c1<8192,n1\*w1%4=0 T2:c1**h1**w1<p,n1**w1<p**8,c1<8192,n1\*w1%4=0 perm=[2,0,3,1] T1,T2:c1<8192,c1**h1**w1<p perm=[2,0,1,3] T1:n1**c1**h1**w1<p,h1**w1%16=0 T2:n1**c1**h1**w1<p,h1**w1%8=0 perm=[2,3,1,0] T1:c1**h1**w1<p,n1**c1<p,h1**w1<8192,h1\*w1%16=0 T2:c1**h1**w1<p,n1**c1<p,h1**w1<8192,h1\*w1%8=0 perm=[2,3,0,1] T1,T2:h1**w1<8192,n1**c1<p perm=[3,0,2,1] T1:h1**w1<p,n1**c1<8192,c1**h1<p,n1**w1<8192,n1\*w1%16=0

109

<!-- page 110 of 374 -->

```csv
- T2:h1w1<p,n1c1<8192,c1h1<p,n1w1<8192,n1*w1%8=0
```

perm=[3,0,1,2]

```csv
- T1:h1w1<p,n1c1<8192,c1h1<p,n1w1<8192,n1h1w1%16=0
```

```txt
• perm=[3,2,0,1]
```

```txt
- T1,T2:h1w1<p,n1c1<8192,n1c1w1<p
```

perm=[3,2,1,0]

```csv
- T1:c1h1w1<p,h1w1<8192,2h1w1<q,n1c1<p*16,h1%16=0
```

```txt
• perm=[3,1,0,2]
```

```csv
• T1,T2:h1w1<p,c1w1<8192,n1*h1<p
```

```txt
• perm=[3,1,2,0]
```

```csv
- T1,T2:h1w1<p,n1c1<8192,n1h1<p,n1c1*w1<p
```

## 数据类型约束

T1:int8(Tensor)

```autohotkey
- T2:int16(Tensor),float16(Tensor)
```

其他支持

多核联合:暂不支持

## Sigmoid

给定输入张量，函数y=1/(1+exp(-x))按元素应用于输入张量，得到输出张量

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

110

<!-- page 111 of 374 -->

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:尚不支持

## Tanh

计算给定输入张量单元的双曲正切

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:尚不支持

## Softplus

按元素应用Softplus函数,y=ln(exp(x)+1)

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

111

<!-- page 112 of 374 -->

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:尚不支持

## HardSigmoid

给定输入张量，函数y=max(0,min(1,alpha\*x+beta))按元素应用于输入张量，得到输出张量，这里alpha=1/6，beta=0.5

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:尚不支持

## HardSwish

按元素应用 HardSwish 函数, y = x \* max(0, min(1, alpha \* x + beta)) = x \* HardSigmoid(x),这里alpha=1/6,beta=0.5

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

112

<!-- page 113 of 374 -->

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:尚不支持

## Elu

给定输入张量，函数f(x)=alpha\*(exp(x)-1.)forx<0,f(x)=xforx>=0按元素应用于输入张量，得到输出张量，这里alpha=1

输入列表

input:T1 shape:[batch,channel,height,width]量化支持per-layer

输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:尚不支持

## exSwish

按元素应用Sigmoid线性单元函数,Swish函数也称为SiLU函数,y=x\*sigmoid(x)

输入列表

113

<!-- page 114 of 374 -->

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:尚不支持

## exMish

给定输入张量，函数mish(x)=x**tanh(softplus(x))=x**tanh(ln(1+e^{x}))按元素应用于输入张量，得到输出张量

输入列表

input:T1 shape:[batch,channel,height,width]量化支持per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:尚不支持

114

<!-- page 115 of 374 -->

## exGelu

给定输入张量，函数y =qx∗Φ(x)按元素应用于输入张量，得到输出张量，当Φ(x)函数设置成tanh时， y =0.5∗x∗(1+Tanh( 2 ∗(x+0.044715∗x3))) π

## 输入列表

input:T1 shape:[batch,channel,height,width]量化支持per-layer

输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:尚不支持

## exSwooshR

给定输入张量，按论文[https://arxiv.org/abs/2310.11230](https://arxiv.org/abs/2310.11230)给定的下列函数，按元素应用于输入张量，得到输出张量 SwooshR(x)=log(1+exp(x-1))-0.08x-0.313261687

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

115

<!-- page 116 of 374 -->

per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:尚不支持

## exSwooshL

给定输入张量，按论文[https://arxiv.org/abs/2310.11230](https://arxiv.org/abs/2310.11230)给定的下列函数，按元素应用于输入张量，得到输出张量 SwooshL(x)=log(1+exp(x-4))-0.08x-0.035

输入列表

input:T1 shape:[batch,channel,height,width]量化支持per-layer

输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:尚不支持

## Where

根据mask\_tensor获取x\_tensor或y\_tensor的值，当mask\_tensor位置为True时，取x\_tensor对应位置的值，否则取y\_tensor的值。

输入列表

mask\_tensor:T1

shape:[batch,channel,height,width]

116

<!-- page 117 of 374 -->

## 广播支持

支持任意维度广播操作

广播约束

广播约束同Expand算子

x\_tensor:\*T2

shape:[batch,channel,height,width]

量化支持

per-layer

广播支持

支持任意维度广播操作

广播约束

广播约束同Expand算子

y\_tensor:T1

shape:[batch,channel,height,width]

量化支持

per-layer

广播支持

支持任意维度广播操作

广播约束

广播约束同Expand算子

## 输出列表

output:T2 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

T1:bool(Tensor)

T2:int8(Tensor),float16(Tensor)

## exConvStreaming

为了减少语音模型的时延，把原始卷积的输入分成若干个时间帧片，将每个时间帧片作为输入，计算卷积，最后将计算结果缓存起来供后续时间帧使用，从而达到音频流式处理的目的。

117

<!-- page 118 of 374 -->

## 输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

width: 目 前支持width=1。

量化支持

per-layer

weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,31]

kernel\_w∈[1,31]

量化支持

per-layer

per-channel

## 输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 属性列表

strides:int(strides\_h,strides\_w)

stride\_h∈[1,7]

stride\_w∈[1,7]

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right)

pads\_top∈[0,15]

pads\_left∈[0,15]

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,32]

dilations\_w∈[1,32]

## 数据类型约束

118

<!-- page 119 of 374 -->

T1:float16(Tensor)

其他支持

多核联合:尚不支持

## exConvStreamingPRelu/LeakyRelu

exConvStreaming 与 PRelu/LeakyRelu 融合计算, Output = PRelu(exConvStreaming(Input)) 或者Output= LeakyRelu(exConvStreaming(Input)) 说明及规格限制同exConvStreaming

## exGlu

门控线性单元(GatedLinearUnit)函数,其中a是输入矩阵的前一半,b是后一半 GLU(a,b)=a⊗σ(b)输入列表

Input:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Output:T1

shape:[batch,channel/2,height,width]

量化支持:per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

属性列表

axis:int(默认值=1)

分割输入的维度

约束:仅支持1

其他支持

多核联合:尚不支持

## exMatMul

矩阵乘法操作

119

<!-- page 120 of 374 -->

$$
Y = \left\{ \begin{array}{l l} A \cdot B + C & \text {if c\_type = "add"} \\ A \cdot B * C & \text {if c\_type = "mul"} \end{array} \right.
$$

## 输入列表

A:T1

shape:[b,k,1,n]

k ∈(0,8192]

量化支持

per-layer

B:T1

shape:[b,k,1,m]

量化支持

per-layer

C(optional):T1,T2

shape:[b,n,1,m]

量化支持

per-layer

广播支持

支持任意维度广播操作

广播约束同Expand算子

## 输出列表

Y:T1

shape:[b,n,1,m]

量化支持

per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

## 属性列表

c\_type:strings(默认值“add”)

支持add和mul可选,表示C是做加法还是乘法

## 其他支持

120

<!-- page 121 of 374 -->

多核联合:不支持

## exNorm

对输入数据进行各种归一化操作，目 前支持LayerNormalization、RMSNormalization和MeanVarianceNormalization三种:

$$
\left| \operatorname{LayerNorm} (x) = \frac {x - \mu}{\sqrt {\sigma^ {2} + \epsilon}} \cdot W + B \right|
$$

$$
\mathrm{RMSNorm} (x) = \frac {x}{\sqrt {\mathrm{RMS} ^ {2} + \epsilon}} \cdot W + B
$$

$$
\text {MeanVarianceNorm} (x) = \frac {x - \mu}{\sqrt {\text {Variance} + \epsilon}} \cdot W + B
$$

其中: x是输入向量。 µ和 $| \sigma ^ { 2 }$ 分别是输入向量的均值和方差:

$$
\mu = \frac {1}{H} \sum_ {i = 1} ^ {H} x _ {i}
$$

$$
\sigma^2 = \frac{1}{H}\sum_{i = 1}^{H}(x_i - \mu)^2
$$

RMS是输入向量均方根:

$$
\text {RMS} = \sqrt {\frac {1}{H} \sum_ {i = 1} ^ {H} x _ {i} ^ {2}}
$$

Variance是输入向量的等效方差:

$$
\text {Variance} = \frac {1}{H} \sum_ {i = 1} ^ {H} x _ {i} ^ {2} - \mu^ {2}
$$

ϵ是一个很小的数，用于防止除零操作。 W 和B是可选择的参数。

输入列表

X:T1

shape:[batch,channel,height,width]

W(optional):T1

shape:[batch,channel,height,width]

121

<!-- page 122 of 374 -->

## B(optional):T1

shape:[batch,channel,height,width]

## 输出列表

Y:T1

shape:[batch,channel,height,width]

## 数据类型约束

T1:float16(Tensor)

属性列表

epsilon:float(默认值1e-05)

用来防止除0的epsilon数值

mode:string

支持layer、rms和mean\_var三种Normalization模式可选

axes:int64[](默认值[1])

归一化轴，目前只支持[1]和[1,2,3]

## 其他支持

多核联合:尚不支持

## exSDPAttention

计算查询(query)、键(key)和值(value)之间的缩放点积注意力(SDPA)

输入列表

query:T1 shape:[batch,channel,height,width] channel∈(0,8192]量化支持per-layer

key:T1 shape:[batch,channel,height,width]量化支持per-layer

value:T1 shape:[batch,channel,height,width]

122

<!-- page 123 of 374 -->

channel∈(0,8192]

量化支持

per-layer

mask(optional):T1,T2

shape:[batch,channel,height,width]

量化支持

per-layer

广播支持

支持任意维度广播操作

scale(optional):T3

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## 其他支持

多核联合:不支持

## exWindow

exWindow来源于[swin\_transformer](https://github.com/microsoft/Swin-Transformer/blob/main/models/swin_transformer.py)的window\_partition和window\_reverse操作。 原论文中输入特征被划分为多个不重叠的窗口，每个窗口的大小为window\_size× window\_size。要求输入和输出特征都为4维shape，在高和宽方向上都进行划分。 pytorch实现的计算方法如下:

123

<!-- page 124 of 374 -->

```python
def window_partition(x, window_size):
    """
    Args:
        x: (B, C, H, W)
        window_size (int): window size
    Returns:
        windows: (B, C, num_windows * num_windows, window_size * window_size)
    """
    B, C, H, W = x.shape
    x = x.view(B, C, H // window_size, window_size, W // window_size, window_size)
    windows = x.permute(0, 1, 2, 4, 3, 5).contiguous().view(B, C, -1, window_size * window_size)
    return windows

def window_reverse(windows, window_size, H, W):
    """
    Args:
        windows: (B, C, num_windows * num_windows, window_size * window_size)
        window_size (int): Window size
        H (int): Height of image
        W (int): Width of image
    Returns:
        x: (B, C, H, W)
    """
    B, C, _, _ = windows.shape
    x = windows.view(B, C, H // window_size, W // window_size, window_size, window_size)
    x = x.permute(0, 1, 2, 4, 3, 5).contiguous().view(B, C, H, W)
    return x
```

```txt
输入列表
• X:T1
    • shape:[batch,channel,height,width]

输出列表
• Y:T1
    • shape:[batch,channel,height,width]

数据类型约束
• T1:int8(Tensor),float16(Tensor)

属性列表
• mode:string
    • 支持模式:partition,reverse,partition_num_first
        • partition:参考window_partition实现;
        • reverse:参考window_reverse实现;
        • partition_num_first: 与 partition 的区别在于，partition_num_first 的 H,W 按照 num_windows进行划分，而partition的H,W按照window_sizes进行划分。
```

124

<!-- page 125 of 374 -->

window\_sizes:listofints

2维向量,窗口的大小。定义了每个窗口的高度和宽度。窗口内的注意力计算和特征提取都是基于这个大小。

num\_windows:listofints

2维向量,窗口的数量。定义了输入特征的高度和宽度被划分为多少个窗口。

## 其他支持

多核联合:尚不支持

## RK3562

## Add

执行元素级二进制加法(C=A+B),支持多向Numpy样式的广播

输入列表

A:T1,T2 shape:[batch,channel,height,width]

量化支持per-layer

广播支持支持任意维度广播操作广播约束同Expand算子

B:T1,T2 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

输出列表

C:T1 shape:[batch,channel,height,width]量化支持per-layer

125

<!-- page 126 of 374 -->

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(constTensor)

## AddRelu

Add与Relu融合计算,C=Relu(A+B)输入列表同Add输出列表同Add其他支持多核联合:支持

## BatchNormalization

按照论文[https://arxiv.org/abs/1502.03167](https://arxiv.org/abs/1502.03167)中的描述对输入张量进行批量归一化计算

输入列表

input:T1 shape:[batch,channel,height,width]量化支持per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

属性列表

epsilon:float（默认值=1e-5）

126

<!-- page 127 of 374 -->

除以标准差时加上防止除0的实数

epsilon∈(0,∞]

momentum:float

训练时的滑动平均参数

## Concat

将一系列向量在axis指定的方向上组合成一个向量，所有向量除axis指定的方向外大小必须相同输入列表

量化支持per-layer

输出列表

output:T

shape:[batch,channel,height,width]

量化支持per-layer

数据类型约束

T:int8(Tensor),float16(Tensor)

属性列表

axisint64 axis∈{0,1,2,3}

## Convolution

卷积

输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

width: 当dilated\_kernel\_h>1时,width<16383。此外,对首层输入width存在限制，详见模型输入说明。

127

<!-- page 128 of 374 -->

## 量化支持

per-layer

## weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,31]

kernel\_w∈[1,31]

量化支持

per-layer

per-channel

## 输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 属性列表

strides:int(strides\_h,strides\_w)

stride\_h∈[1,7]

stride\_w∈[1,7]

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right)

pads\_top∈[0,15]

pads\_left∈[0,15]

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,31]

dilations\_w∈[1,31]

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## Depthwise Convolution

深度可分离卷积

128

<!-- page 129 of 374 -->

## 输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

width: 当dilated\_kernel\_h>1时,width<16383。此外,对首层输入width存在限制，详见模型输入说明。

量化支持

per-layer

weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,8]

kernel\_w∈[1,8]

量化支持

per-layer

per-channel

## 输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 属性列表

strides:int(strides\_h,strides\_w)

stride\_h∈[1,7]

stride\_w∈[1,7]

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right)

pads\_top∈[0,15]

pads\_left∈[0,15]

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,32]

dilations\_w∈[1,32]

## 数据类型约束

129

<!-- page 130 of 374 -->

T1:int8(Tensor),float16(Tensor)

## ConvolutionRelu

Convolution与Relu融合计算,Output=Relu(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionClip

Convolution与Clip融合计算,Output=Clip(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionPRelu/LeakyRelu

Convolution 与 PRelu/LeakyRelu 融合计算, Output = PRelu(Conv(Input)) 或者 Output =

LeakyRelu(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionAdd

Convolution与Add融合计算,Output=Add(Conv(Input0),Input1) 说明及规格限制同Convolution

## ConvolutionSigmoid

Convolution与Sigmoid融合计算, $,Output=Sigmoid(Conv(Input))$ 说明及规格限制同Convolution

## ConvolutionTanh

Convolution与Tanh融合计算,Output=Tanh(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionSoftplus

Convolution与Softplus融合计算,Output=Softplus(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionHardSigmoid

Convolution与HardSigmoid融合计算,Output=HardSigmoid(Conv(Input)) 说明及规格限制同

Convolution

## ConvolutionHardSwish

Convolution与HardSwish融合计算,Output=HardSwish(Conv(Input)) 说明及规格限制同Convolution

130

<!-- page 131 of 374 -->

## ConvolutionElu

Convolution与Elu融合计算,Output=Elu(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionSwish

Convolution与Swish融合计算,Output=Swish(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionMish

Convolution与Mish融合计算,Output=Mish(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionAddRelu

Convolution与Add及Relu融合计算,Output=Relu(Add(Conv(Input0),Input1)) 说明及规格限制同Convolution

## ConvTranspose

转置卷积

输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

width: 当dilated\_kernel\_h>1时,width<16383。此外,对首层输入width存在限制，详见模型输入说明。

量化支持

per-layer

weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,31]

kernel\_w∈[1,31]

量化支持

per-layer

per-channel

输出列表

131

<!-- page 132 of 374 -->

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 属性列表

strides:int(strides\_h,strides\_w)

stride\_h∈[1,8]

stride\_w∈[1,8]

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right) 设置pad时注意: 不支持kernel\_h**dilations\_h-dilations\_h-pads\_top<0** 不支持**kernel\_w**dilations\_w-dilations\_wpads\_left<0 不支持stride\_h**(height-1)-pads\_top+1<output\_h** 不支持**stride\_w**(width-1)- pads\_left+1<output\_w

pads\_top∈[0,15]

pads\_left∈[0,15]

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

group:仅支持1,当且仅当num\_input=num\_output时支持num\_output

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,32]

dilations\_w∈[1,32]

当dilation不等于(1,1)时，只支持kernel=(1,1)

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## ConvTranposeRelu

ConvTranpose与Relu融合计算,Output=Relu(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeClip

ConvTranpose与Clip融合计算,Output=Clip(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposePRelu/LeakyRelu

132

<!-- page 133 of 374 -->

ConvTranpose与PRelu/LeakyRelu融合计算,Output=PRelu(ConvTranpose(Input))或者Output= LeakyRelu(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeAdd

ConvTranpose与Add融合计算,Output=Add(ConvTranpose(Input0),Input1) 说明及规格限制同

ConvTranspose

## ConvTranposeSigmoid

ConvTranpose与Sigmoid融合计算,Output=Sigmoid(ConvTranpose(Input)) 说明及规格限制同

ConvTranspose

## ConvTranposeTanh

ConvTranpose与Tanh融合计算,Output=Tanh(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeSoftplus

ConvTranpose与Softplus融合计算,Output=Softplus(ConvTranpose(Input)) 说明及规格限制同

ConvTranspose

## ConvTranposeHardSigmoid

ConvTranpose与HardSigmoid融合计算,Output=HardSigmoid(ConvTranpose(Input))

## ConvTranposeHardSwish

ConvTranpose与HardSwish融合计算,Output=HardSwish(ConvTranpose(Input)) 说明及规格限制同

ConvTranspose

## ConvTranposeElu

ConvTranpose与Elu融合计算,Output=Elu(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeSwish

ConvTranpose与Swish融合计算,Output=Swish(ConvTranpose(Input)) 说明及规格限制同

ConvTranspose

133

<!-- page 134 of 374 -->

## ConvTranposeMish

ConvTranpose与Mish融合计算,Output=Mish(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## Div

执行元素级二进制除法(C=A/B),支持多向Numpy样式的广播

输入列表

A:T1,T2 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

B:T1,T2 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

输出列表

C:T1 shape:[batch,channel,height,width]量化支持per-layer

数据类型约束

T1:float16(Tensor)

T2:float(constTensor)

## Expand

输入列表

134

<!-- page 135 of 374 -->

input1:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

```txt
- T1:int8(Tensor),float16(Tensor)
```

广播约束

[b,c,1,w]->[b,c,h,w],h∈[1,8192]

[b,1,1,w]->[b,c,h,w],h∈[1,8192]

[b,c,h,1]->[b,c,h,w],w ∈[1,8192]

[b,1,h,1]->[b,c,h,w],w ∈[1,8192]

[b,c,1,1]->[b,c,h,w],h∈[1,8192],w ∈[1,8192]

## GRU

门控循环单元（GRU，GatedRecurrentUnit） GRU扩展以及变体命名为exGRU算子，参数项中指明（extern）的项为exGRU独有的参数项。 计算公式如下: Equations(Default:f=Sigmoid,g=Tanh): r\_t = f(x\_t · W\_r + h\_{t−1} · R\_r + Wb\_r + Rb\_r) z\_t = f(x\_t · W\_z + h\_{t−1} · R\_z + Wb\_z + Rb\_z) h\_t = g(x\_t · W\_h + (r\_t ⊙ h\_{t−1}) · R\_h + Rb\_h + Wb\_h), (WRB=0) h\_t = g(x\_t · W\_h + r\_t ⊙ (h\_{t−1} · R\_h + Rb\_h)) + Wb\_h, (WRB=1) H\_t = (1 − z\_t) ⊙ h\_t + z\_t ⊙ h\_{t−1}

输入列表

X:T1

shape:[seq\_length,batch\_size,input\_size]

seqlength∈(0,8192]

batchsize∈(0,8192],大于1时仅支持4的倍数

inputsize∈(0,8192]

量化支持

per-layer

W:T1

135

<!-- page 136 of 374 -->

- shape:[num\_directions,4\*hidden\_size,input\_size]
- inputsize∈(0,8192]
- hiddensize∈(0,8192]
- numdirections:1or2
- 量化支持
- per-layer
- per-channel
- R:T1
- shape:[num\_directions,4\*hidden\_size,hidden\_size]
- hiddensize∈(0,8192]
- numdirections:1or2
- 量化支持
- per-layer
- per-channel
- B:T2
- shape:[num\_directions,8\*hidden\_size]
- hiddensize∈(0,8192]
- numdirections:1or2
- 量化支持
- per-layer
- per-channel
- sequence\_lens:T3(optional)
- shape:[batch\_size]
- batchsize∈(0,8192],大于1时仅支持4的倍数
- initial\_h:T1(optional)
- shape:[num\_directions,batch\_size,hidden\_size]
- numdirections:1or2
- batchsize∈(0,8192],大于1时仅支持4的倍数
- hiddensize∈(0,8192]
- 量化支持
- per-layer
- 输出列表

Y:T1

136

<!-- page 137 of 374 -->

shape:[seq\_length,num\_directions,batch\_size,hidden\_size]

seqlength∈(0,8192]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

Y\_h:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

## 属性列表

linear\_before\_reset:int

LBR变种的选择:1(T)or0(F)

direction(extern):string

指定GRU的运算方向

forward:指定GRU的运算方向为前向

reverse:指定GRU的运算方向为反向

bidirectional:指定GRU的运算方向为双向

sequence\_size(extern):int

指定GRU输入的seqsize，无限制，建议4对齐

hidden\_size(extern):int

GRU单元中的hiddensize，无限制，建议8对齐

input\_layout(extern):int

指定与对应输入shape含义一致的layout

要求填写指定的layout，同时要求填写该op实际对应的batch\_size、sequence\_size、hidden\_size。

snc:指定layout对应的输入shape为[seqs,batches,input\_size]

(sn)c:指定layout对应的输入shape为[seqs\*batches,input\_size,1,1]

output\_layout(extern):int

指定与对应输出shape含义一致的layout

137

<!-- page 138 of 374 -->

要求填写指定的layout，同时要求填写该op实际对应的batch\_size、sequence\_size、hidden\_size、directions。

sbnc:指定layout对应的输出shape为[seqs,directions,batches,hidden\_size]

(sn)c:指定layout对应的输出shape为[seqsbatches,directionsinput\_size,1,1]

## 数据类型约束

T1:float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## 其他支持

多核联合:暂不支持

## Gather

根据索引Indices获取输入X的指定axis维度的条目，并将它们拼接在一起。

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持

per-layer

Indices:T2

要收集的元素的索引，秩rank =1

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:int(Tensor)

属性列表

axis:int(Tensor)

axis∈{0,1,2,3}

138

<!-- page 139 of 374 -->

指定Indices获取输入的维度

其他支持

多核联合:尚不支持

## Hardmax

输入列表

input:T1

shape:[batch,channel,height,width]

axis=1,height∗width<16384;

axis=3/-1,channel∗height<16384,且受限于transpose的规格限制

输出列表

output:T1

```txt
- shape:[batch,channel,height,width]
```

数据类型约束

T1:int8(Tensor),float16(Tensor)

属性列表

axis:int

做hardmax的轴:1,3/-1，即channel和width方向

其他支持

多核联合:尚不支持

## LSTM

长短期记忆网络（LSTM，Long Short-Term Memory） LSTM扩展以及变体命名为exLSTM算子，参数项中指明 （extern）的项为exLSTM独有的参数项。 计算公式如下:

```txt
Equations(Default:f=Sigmoid,g=Tanh,h=Tanh): i_t = f(x_t · W_i + h_{t-1} · R_i + Wb_i + Rb_i) f_t = f(x_t · W_f + h_{t-1} · R_f + Wb_f + Rb_f) c_t = f(x_t · W_c + h_{t-1} · R_c + Wb_c + Rb_c) o_t = f(x_t · W_o + h_{t-1} · R_o + Wb_o + Rb_o) C_t = f_t ⊙ C_{t-1} + i_t ⊙ c_t h_t = o_t ⊙ h(C_t)
```

输入列表

```txt
• X:T1
```

shape:[seq\_length,batch\_size,input\_size]

139

<!-- page 140 of 374 -->

- seqlength∈(0,8192]
- batchsize∈(0,8192),大于1时仅支持4的倍数
- inputsize∈(0,8192)
- 量化支持
- per-layer
- W:T2
- shape:[num\_directions,4\*hidden\_size,input\_size]
- inputsize∈(0,8192]
- hiddensize∈(0,8192]
- numdirections:1or2
- 量化支持
- per-layer
- per-channel
- R:T2
- shape:[num\_directions,4\*hidden\_size,hidden\_size]
- hiddensize∈(0,8192]
- numdirections:1or2
- 量化支持
- per-layer
- per-channel
- B:T2
- shape:[num\_directions,8\*hidden\_size]
- hiddensize∈(0,8192]
- numdirections:1or2
- 量化支持
- per-layer
- per-channel
- sequence\_lens:T2(optional)
- shape:[batch\_size]
- batchsize∈(0,8192),大于1时仅支持4的倍数
- initial\_h:T1(optional)
- shape:[num\_directions,batch\_size,hidden\_size]
- numdirections:1or2
- batchsize∈(0,8192),大于1时仅支持4的倍数

140

<!-- page 141 of 374 -->

## hiddensize∈(0,8192]

## 量化支持

per-layer

## initial\_c:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

## 输出列表

Y:T1

shape:[seq\_length,num\_directions,batch\_size,hidden\_size]

seqlength∈(0,8192]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

## 量化支持

per-layer

Y\_h:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

## Y\_c:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

## 量化支持

per-layer

141

<!-- page 142 of 374 -->

## 属性列表

direction(extern):string

指定LSTM的运算方向

forward:指定LSTM的运算方向为前向

reverse:指定LSTM的运算方向为反向

bidirectional:指定LSTM的运算方向为双向

sequence\_size(extern):int

指定LSTM输入的seqsize，无限制，建议4对齐

hidden\_size(extern):int

LSTM单元中的hiddensize，无限制，建议8对齐

proj\_size(extern):int

projection时的proj\_size，projsize∈[0,hiddensize]

目前限定0，即尚不支持projection功能

input\_forget(extern):int

cifg变种的选择:1(T)or0(F) 目 前限定0，即尚不支持

has\_projection(extern):int

projection变种:1(T)or0(F) 目 前限定0，即尚不支持

input\_layout(extern):int

指定与对应输入shape含义一致的layout

要求填写指定的layout，同时要求填写该op实际对应的batch\_size、sequence\_size、hidden\_size。

snc:指定layout对应的输入shape为[seqs,batches,input\_size]

(sn)c:指定layout对应的输入shape为[seqs\*batches,input\_size,1,1]

output\_layout(extern):int

指定与对应输出shape含义一致的layout

要求填写指定的layout，同时要求填写该op实际对应的batch\_size、sequence\_size、hidden\_size、directions。

sbnc:指定layout对应的输出shape为[seqs,directions,batches,hidden\_size]

(sn)c:指定layout对应的输出shape为[seqsbatches,directionsinput\_size,1,1]

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:int32(Tensor)

T4:float(Scalar)

其他支持

142

<!-- page 143 of 374 -->

多核联合:暂不支持

## Max

计算输入张量的元素级最大值

输入列表

A:T1 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

B:T1 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

输出列表

C:T1 shape:[batch,channel,height,width]量化支持per-layer/per-channel

数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:暂不支持

## Mul

执行元素级二进制乘法(C=A\*B),支持多向Numpy样式的广播

143

<!-- page 144 of 374 -->

## 输入列表

A:T1,T2 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

B:T1,T2 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

输出列表

C:T1 shape:[batch,channel,height,width]量化支持per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(constTensor)

## MulRelu

Mul与Relu融合计算,C=Relu(A\*B)

输入列表

同Mul

输出列表

同Mul

其他支持

144

<!-- page 145 of 374 -->

多核联合:支持

## Pad

给定一个包含要填充的数据的张量(data),包含轴的开始和结束填充数值的张量(pads),模式(mode),常量数值(constant\_value),生成一个填充张量(output)

输入列表

data:T1

shape:[batch,channel,height,width]

量化支持

per-layer

pads:T2

shape : [batch\_begin, channel\_begin, height\_begin, width\_begin, batch\_end, channel\_end,height\_end,width\_end]

constant\_value(optional):T3 shape:[1]量化支持per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:int64(Tensor)

T3:float(Scalar),int8(Scalar),float16(Scalar)

## 属性列表

mode:string(默认值constant)

支持模式:constant,reflect

constant无限制

reflectchannel∈(0,8192],height∈(0,8192],width∈(0,8176]

145

<!-- page 146 of 374 -->

## 其他支持

多核联合:尚不支持

## MaxPool

MaxPool消耗输入张量X并根据内核大小、步幅大小和pad长度在张量上应用最大池化。最大池化包括根据内核大小计算输入张量子集的所有值的最大值，并将数据下采样到输出张量Y中以进行进一步处理。 输出空间形状的计算方式有所不同，具体取决于是否使用显式填充（在使用pads的情况下）或使用 自 动填充（在使用auto\_pad的情况下）。仅使用显式填充

输入列表

input:T1

shape:[batch,channel,height,width] channel∈(0,8192] height∈(0,8192] width∈(0,8192]

输出列表

output:T1

shape:[batch,channel,height,width]

属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

kernel\_h∈(0,7]

kernel\_w∈(0,7]

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

146

<!-- page 147 of 374 -->

pad\_bottom∈[0,7]

pad\_right∈[0,7]

storage\_order:int64[]

优先储存方式:0

数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## GlobalMaxPool

GlobalMaxPool使用输入张量X并对同一通道中的值应用最大池化。这相当于MaxPool的kernel\_shape 大小等于input的空间维度。

输入列表

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

height∈(0,7]

width∈(0,7]

输出列表

output:T1

shape:[batch,channel,height,width]

属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

kernel\_h∈(0,7]

kernel\_w∈(0,7]

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

147

<!-- page 148 of 374 -->

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## AveragePool

AveragePool使用输入张量X并根据内核大小、步幅大小和pad长度在张量上应用平均池化。平均池化包括根据内核大小计算输入张量子集的所有值的平均值，并将数据下采样到输出张量Y中以进行进一步处理。输出空间形状的计算方式有所不同，具体取决于是否使用显式填充（在使用pads的情况下）或使用 自动填充（在使用auto\_pad的情况下）。仅使用显式填充

输入列表

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

height∈(0,8192]

width∈(0,8192]

输出列表

output:T1

shape:[batch,channel,height,width]

属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

kernel\_h∈(0,7]

kernel\_w∈(0,7]

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

148

<!-- page 149 of 374 -->

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## GlobalAveragePool

GlobalAveragePool使用输入张量X并对同一通道中的值应用平均池化。这相当于AveragePool，其kernel\_shape大小等于输入张量的空间维度。

输入列表

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

height∈(0,7]

width∈(0,7]

输出列表

output:T1

shape:[batch,channel,height,width]

属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

kernel\_h∈(0,7]

kernel\_w∈(0,7]

149

<!-- page 150 of 374 -->

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## Pow

Z =XY 指数运算，采用输入数据（张量）和指数，并产生一个输出数据（张量）

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持

per-layer

Y:T2

shape:[1]

当前仅支持0、1、2、3、0.5、-0.5

输出列表

Z:T1

shape:[batch,channel,height,width]

150

<!-- page 151 of 374 -->

## 量化支持

per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:int8(Tensor),int32(Tensor),int64(Tensor),float16(Tensor),float(Tensor)

## 其他支持

多核联合:尚不支持

## Relu

将输入张量的负值设为零，正值保持不变

输入列表

input:T1 shape:[batch,channel,height,width]量化支持per-layer广播支持无

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:暂不支持

## Clip/ReLU6

将输入张量的值裁剪到[0,6]范围内

输入列表

151

<!-- page 152 of 374 -->

## input:T1

shape:[batch,channel,height,width]

量化支持per-layer

广播支持无

## 输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

## 多核联合:暂不支持

## PRelu

将输入张量的负值按可学习参数缩放，正值保持不变

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持per-layer/per-channel

广播支持无

## 输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer/per-channel

152

<!-- page 153 of 374 -->

## 属性列表

slope:PRelu系数仅支持单个标量或C维度系数

数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:暂不支持

## LeakyRelu

将输入张量的负值按固定比例缩放，正值保持不变

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持per-layer

广播支持无

输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:暂不支持

## Reshape

在不改变输入数据和元素数量的情况下，返回一个具有指定形状的张量。

153

<!-- page 154 of 374 -->

## 输入列表

input:T1 shape:[batch,channel,height,width]量化支持per-layer

输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

属性列表

shape:int指定输出张量的形状

其他支持

多核联合:尚不支持

## Resize

调整输入张量的大小。一般来说，它将输出张量中的每个值计算为输入张量中邻域（即采样位置）的加权平均值

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持per-layer

roi(optional):T2目前暂不支持

scales(optional):T2沿每个维度的缩放比例数组

sizes(optional):T3

154

<!-- page 155 of 374 -->

## 输出张量的目标大小

## 输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:int64(Tensor)

## 属性列表

antialias:int（默认值为0）

目前不支持设置

axes:int[]目前不支持设置

coordinate\_transformation\_mode:strings（默认值为”half\_pixel”）目 前仅支持half\_pixel，pytorch\_half\_pixel，align\_corners三种

cubic\_coeff\_a:float（默认为-0.75）目前不支持设置

exclude\_outside:int（默认值为0）

目前不支持设置

extrapolation\_value:float（默认为0）目前不支持设置

keep\_aspect\_ratio\_policy:strings（默认值为”stretch”）

目前不支持设置

mode:strings（默认值为”nearest”）目 前仅支持nearest和linear两种可配置

nearest\_mode:strings（默认值为”round\_prefer\_floor”）

目前不支持设置支持说明 目前仅支持宽高方向的整数倍缩放,且缩放倍数为2-8的整数倍,如果是(1,c,1,1)则支持放大到(1,c,h, w)

## Slice

155

<!-- page 156 of 374 -->

获得当前向量的一个切片，具体规则和[numpy切片](https://numpy.org/doc/stable/user/basics.indexing.html)相同

输入列表

input\_tensor:T

```txt
- shape:[batch,channel,height,width]
```

量化支持

```txt
- per-layer
```

输出列表

output:T

shape:[batch,channel,height,width]

量化支持

```txt
• per-layer
```

## 数据类型约束

```erlang
- T:int8(Tensor),float16(Tensor)
```

属性列表

starts:int(Tensor)

切分的起始位置:无限制

ends:int(Tensor)

切分的终止位置:无限制

axes:int(Tensor)

选取切分的轴:支持任意0\~3轴，支持同时多轴选择

steps:int(Tensor)

选取切分对应轴的步长

```txt
- 当height*width==1&&channel%subc==0&&starts[1]%subc==0&&ends[1]% subc==0&&steps[1]<=subc时,steps可以不为1，否则只有steps==[1,1,1,1]时，才可通过 NPU运行SliceOP
```

## Softmax

该运算符计算给定输入的归一化指数值:

```txt
Softmax(input, axis) = exp(input - max(input, axis)) / Σ_axis exp(input - max(input, axis))
```

“axis”属性表示Softmax执行的维度。输出张量具有相同的形状并包含相应输入的Softmax值。

输入列表

156

<!-- page 157 of 374 -->

```txt
- input:T1
    - shape:[batch,channel,height,width]
    - 受限于transpose的规格限制
```

输出列表

数据类型约束

属性列表

axis:int

## exSoftmax13

该运算符计算给定输入的归一化指数值:

```julia
exSoftmax13(input, axis) = exp(input - max(input, axis)) / Σ_axis exp(input - max(input, axis))
```

“axis”属性表示Softmax执行的维度。输出张量具有相同的形状并包含相应输入的Softmax值。

输入列表

```txt
- input:T1
    - shape:[batch,channel,height,width]
    - 受限于transpose的规格限制
```

输出列表

```yaml
- output:T1
  - shape:[batch,channel,height,width]
```

数据类型约束

T1:int8(Tensor),float16(Tensor)

属性列表

axis:int64

做softmax的轴:1,3，即channel和width方向

157

<!-- page 158 of 374 -->

## exSoftmaxMask

该运算符计算给定输入的归一化指数值:

$$
\text {input} (x, m a s k \_ t, m a s k \_ v a l u e) = \left\{ \begin{array}{l l} x + (m a s k _ {t} - 1) * i n f & \text {if} m a s k \_ v a l u e = 0 \\ x + m a s k _ {t} * (- i n f) & \text {elif} m a s k \_ v a l u e = 1 \end{array} \right.
$$

$$
\text {exSoftmaxMask} (i n p u t, a x i s) = \frac {\exp (i n p u t - \max (i n p u t , a x i s))}{\sum_ {a x i s} \exp (i n p u t - \max (i n p u t , a x i s))}
$$

"axis"属性表示Softmax执行的维度。输出张量具有相同的形状并包含相应输入的Softmax值。

输入列表

input:T1

shape:[batch,channel,height,width]

受限于transpose的规格限制

mask(optional):T1

shape:[1,channel,height,width]

channel∈(0,8192]

输出列表

output:T1

shape:[batch,channel,height,width]

数据类型约束

T1:int8(Tensor),float16(Tensor)

属性列表

axis:int64

做softmax的轴:1,3，即channel和width方向

mask\_value:int64

需要mask的值:0,1

## Split

将向量沿着axis方向分成num\_outputs个向量，split用于指定切分后向量在axis方向上的大小

输入列表

158

<!-- page 159 of 374 -->

## input\_tensor:T

shape:[batch,channel,height,width]

量化支持per-layer

## 输出列表

output:T

一或多个输出向量，由num\_outputs属性决定

shape:根据切分情况决定

量化支持per-layer

数据类型约束

T:int8(Tensor),float16(Tensor)

属性列表

axis:int axis∈{0,1,2,3}

num\_outputs:int

split:int(Tensor)

## Sub

执行元素级二进制减法(C=A-B),支持多向Numpy样式的广播

输入列表

A:T1,T2

shape:[batch,channel,height,width]

量化支持per-layer

广播支持[b,c,1,1] [scalar]

B:T1,T2

shape:[batch,channel,height,width]

量化支持

159

<!-- page 160 of 374 -->

per-layer

广播支持[b,c,1,1] [scalar]

## 输出列表

C:T1

shape:[batch,channel,height,width]

量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(constTensor)

## Tile

通过平铺给定的张量构造张量,这与Numpy中的函数tile相同，但没有广播

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持per-layer

repeats:T2 shape:[batch,channel,height,width]

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:int64(Tensor)

160

<!-- page 161 of 374 -->

## Transpose

对输入张量进行转置输入列表X:T1 shape:[n1,c1,h1,w1]详细约束规则见属性列表量化支持per-layer输出列表Y:T1,T2 shape:[n2,c2,h2,w2]详细约束规则见属性列表量化支持per-layer

## 属性列表

perm转置的轴顺序: 不同perm参数限制如下:(其中p=268435456,q=65536) perm=[0,1,2,3]无限制perm=[0,1,3,2] T1:h1%16=0,h1**w1<16**p,h1**w1<2**q T2:h1%8=0,h1**w1<8**p,h1**w1<2**q perm=[0,2,3,1] T1:c1<8192,h1**w1%8=0**， **w1**c1<p\*16 T2:c1<8192,h1**w1%8=0**， **w1**c1<p\*8 perm=[0,2,1,3] T1:h1%16=0,h1**w1<16**p,h1**w1<2**q,c1\*w1<p T2:h1%8=0,h1**w1<8**p,h1**w1<2**q,c1\*w1<p perm=[0,3,1,2] T1,T2:h1**w1<p,w1<8192,h1**c1<p perm=[0,3,2,1] T1:h1%16=0,h1**w1<16**p,h1**w1<2**q,c1<p\*16

161

<!-- page 162 of 374 -->

T2:h1%8=0,h1**w1<8**p,h1**w1<2**q,c1<p\*8 perm=[1,0,2,3] T1:h1**w1<16**p,n1<8192,h1\*w1<p T2:h1**w1<8**p,n1<8192,h1\*w1<p perm=[1,0,3,2] T1:h1%16=0,c1**h1**w1<16**p,h1**w1<2\*q T2:h1%8=0,c1**h1**w1<8**p,h1**w1<2\*q perm=[1,2,0,3] T1:n1**w1<p**16,c1**h1**w1<p,w1%16=0 T2:n1**w1<p**8,c1**h1**w1p,w1%8=0 perm=[1,2,3,0] T1:h1**w1<p,n1<p**16,c1**h1**w1<p**16,n1**w1<p\*16 T2:h1**w1<p,n1<p**8,c1**h1**w1<p**8,n1**w1<p\*8 perm=[1,3,0,2] T1:c1**w1<8192,n1**h1<p,w1%16=0 T2:c1**w1<8192,n1**h1<p,w1%8=0 perm=[1,3,2,0] T1:c1**h1**w1<p,n1\*h1<p,w1<8192,w1%16=0 T2:c1**h1**w1<p,n1\*h1<p,w1<8192,w1%8=0 perm=[2,1,0,3] T1,T2:c1<8192,c1**h1**w1<p,n1\*w1<p perm=[2,1,3,0] T1:c1**h1**w1<p,n1**w1<p**16,c1<8192,n1\*w1%4=0 T2:c1**h1**w1<p,n1**w1<p**8,c1<8192,n1\*w1%4=0 perm=[2,0,3,1] T1,T2:c1<8192,c1**h1**w1<p perm=[2,0,1,3] T1:n1**c1**h1**w1<p,h1**w1%16=0 T2:n1**c1**h1**w1<p,h1**w1%8=0 perm=[2,3,1,0] T1:c1**h1**w1<p,n1**c1<p,h1**w1<8192,h1\*w1%16=0 T2:c1**h1**w1<p,n1**c1<p,h1**w1<8192,h1\*w1%8=0 perm=[2,3,0,1] T1,T2:h1**w1<8192,n1**c1<p perm=[3,0,2,1]

162

<!-- page 163 of 374 -->

```csv
- T1:h1w1<p,n1c1<8192,c1h1<p,n1w1<8192,n1*w1%16=0
```

$$
\circ \quad T 2: h 1 w 1 <   p, n 1 c 1 <   8 1 9 2, c 1 h 1 <   p, n 1 w 1 <   8 1 9 2, n 1 ^ {*} w 1 \% 8 = 0
$$

perm=[3,0,1,2]

```csv
- T1:h1w1<p,n1c1<8192,c1h1<p,n1w1<8192,n1h1w1%16=0
```

```csv
- T2:h1w1<p,n1c1<8192,c1h1<p,n1w1<8192,n1h1w1%8=0
```

```txt
• perm=[3,2,0,1]
```

```csv
○ T1,T2:h1w1<p,n1c1<8192,n1c1w1<p
```

perm=[3,2,1,0]

```csv
- T1:c1h1w1<p,h1w1<8192,2h1w1<q,n1c1<p*16,h1%16=0
```

```csv
- T2:c1h1w1<p,h1w1<8192,2h1w1<q,n1c1<p*8,h1%8=0
```

```txt
• perm=[3,1,0,2]
```

```csv
- T1,T2:h1w1<p,c1w1<8192,n1*h1<p
```

```txt
• perm=[3,1,2,0]
```

```csv
- T1,T2:h1w1<p,n1c1<8192,n1h1<p,n1c1*w1<p
```

## 数据类型约束

T1:int8(Tensor)

T2:int16(Tensor),float16(Tensor)

## 其他支持

多核联合:暂不支持

## Sigmoid

给定输入张量，函数y=1/(1+exp(-x))按元素应用于输入张量，得到输出张量

输入列表

input:T1

```txt
- shape:[batch,channel,height,width]
```

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

163

<!-- page 164 of 374 -->

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## Tanh

计算给定输入张量单元的双曲正切

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## Softplus

按元素应用Softplus函数,y=ln(exp(x)+1)

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## HardSigmoid

164

<!-- page 165 of 374 -->

给定输入张量，函数y=max(0,min(1,alpha\*x+beta))按元素应用于输入张量，得到输出张量，这里alpha=1/6，beta=0.5

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## HardSwish

按元素应用 HardSwish 函数, y = x \* max(0, min(1, alpha \* x + beta)) = x \* HardSigmoid(x),这里alpha=1/6,beta=0.5

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## Elu

165

<!-- page 166 of 374 -->

给定输入张量，函数f(x)=alpha\*(exp(x)-1.)forx<0,f(x)=xforx>=0按元素应用于输入张量，得到输出张量，这里alpha=1

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## exSwish

按元素应用Sigmoid线性单元函数,Swish函数也称为SiLU函数,y=x\*sigmoid(x)

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

## exMish

166

<!-- page 167 of 374 -->

给定输入张量，函数mish(x)=x**tanh(softplus(x))=x**tanh(ln(1+e^{x}))按元素应用于输入张量，得到输出张量

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## exGelu

给定输入张量，函数y =qx∗Φ(x)按元素应用于输入张量，得到输出张量，当Φ(x)函数设置成tanh时， y =0.5∗x∗(1+Tanh( 2 ∗(x+0.044715∗x3))) π

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

167

<!-- page 168 of 374 -->

## Where

根据mask\_tensor获取x\_tensor或y\_tensor的值，当mask\_tensor位置为True时，取x\_tensor对应位置的值，否则取y\_tensor的值。

## 输入列表

- - mask\_tensor:T1
- - shape:[batch,channel,height,width]
- - 广播支持
- - 支持任意维度广播操作
- - 广播约束
- - 广播约束同Expand算子
- - x\_tensor:\*T2
- - shape:[batch,channel,height,width]
- - 量化支持
- - per-layer
- - 广播支持
- - 支持任意维度广播操作
- - 广播约束
- - 广播约束同Expand算子
- - y\_tensor:T1
- - shape:[batch,channel,height,width]
- - 量化支持
- - per-layer
- - 广播支持
- - 支持任意维度广播操作
- - 广播约束
- - 广播约束同Expand算子

## 输出列表

output:T2 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

168

<!-- page 169 of 374 -->

T1:bool(Tensor)

T2:int8(Tensor),float16(Tensor)

## exGlu

门控线性单元(GatedLinearUnit)函数,其中a是输入矩阵的前一半,b是后一半 GLU(a,b)=a⊗σ(b)

输入列表

Input:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Output:T1

shape:[batch,channel/2,height,width]

量化支持:per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

属性列表

axis:int(默认值=1)

分割输入的维度

约束:仅支持1

## exMatMul

矩阵乘法操作

$$
Y = \left\{ \begin{array}{l l} A \cdot B + C & \text {if} c _ {-} t y p e = " \text {add}" \\ A \cdot B * C & \text {if} c _ {-} t y p e = " \text {mul}" \end{array} \right.
$$

输入列表

A:T1

shape:[b,k,1,n]

k ∈(0,8192]

量化支持

per-layer

169

<!-- page 170 of 374 -->

B:T1 shape:[b,k,1,m]量化支持per-layer

C(optional):T1,T2

shape:[b,n,1,m]

量化支持

per-layer

广播支持

支持任意维度广播操作

广播约束同Expand算子

输出列表

Y:T1 shape:[b,n,1,m]量化支持per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

属性列表

c\_type:strings(默认值“add”)

支持add和mul可选,表示C是做加法还是乘法

## exNorm

对输入数据进行各种归一化操作，目 前支持LayerNormalization、RMSNormalization和MeanVarianceNormalization三种:

$$
\left| \operatorname{LayerNorm} (x) = \frac {x - \mu}{\sqrt {\sigma^ {2} + \epsilon}} \cdot W + B \right|
$$

$$
\left| \mathrm{RMSNorm} (x) = \frac {x}{\sqrt {\mathrm{RMS} ^ {2} + \epsilon}} \cdot W + B \right|
$$

170

<!-- page 171 of 374 -->

$$
\text {MeanVarianceNorm} (x) = \frac {x - \mu}{\sqrt {\text {Variance} + \epsilon}} \cdot W + B
$$

其中: x是输入向量。 µ和σ²分别是输入向量的均值和方差:

$$
\mu = \frac{1}{H}\sum_{i = 1}^{H}x_{i}
$$

$$
\sigma^2 = \frac{1}{H}\sum_{i = 1}^{H}(x_i - \mu)^2
$$

RMS是输入向量均方根:

$$
\mathrm{RMS} = \sqrt {\frac {1}{H} \sum_ {i = 1} ^ {H} x _ {i} ^ {2}}
$$

Variance是输入向量的等效方差:

$$
\text {Variance} = \frac{1}{H}\sum_{i = 1}^{H}x_{i}^{2} - \mu^{2}
$$

ϵ是一个很小的数，用于防止除零操作。 W 和B是可选择的参数。

输入列表

X:T1

shape:[batch,channel,height,width]

W(optional):T1

shape:[batch,channel,height,width]

B(optional):T1

shape:[batch,channel,height,width]

输出列表

Y:T1

shape:[batch,channel,height,width]

数据类型约束

T1:float16(Tensor)

属性列表

171

<!-- page 172 of 374 -->

epsilon:float(默认值1e-05)用来防止除0的epsilon数值

mode:string支持layer、rms和mean\_var三种Normalization模式可选

axes:int64[](默认值[1])

归一化轴，目前只支持[1]和[1,2,3]

## 其他支持

多核联合:尚不支持

## exSDPAttention

计算查询(query)、键(key)和值(value)之间的缩放点积注意力(SDPA)

输入列表

query:T1 shape:[batch,channel,height,width] channel∈(0,8192]量化支持per-layer

key:T1 shape:[batch,channel,height,width]量化支持per-layer

value:T1 shape:[batch,channel,height,width] channel∈(0,8192]量化支持per-layer

mask(optional):T1,T2 shape:[batch,channel,height,width]量化支持per-layer广播支持默认支持任意维度广播操作

172

<!-- page 173 of 374 -->

开启FA支持后,只支持[b,c,1,1],[1,c,1,1]和[1,c,h,w]三种规格

scale(optional):T3

## 输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## 其他支持

FlashAttentionV2(FA):支持

基于[https://arxiv.org/abs/2307.08691](https://arxiv.org/abs/2307.08691)实现,通过高速缓存内循环实现加速以及减少宽带使用，但是会导致模型增大，请根据具体场景和模型选择是否开启使用

RKNPU驱动版本>=0.8.8

RKNPURuntime库(librknnrt.so)版本>=2.0.0

支持数据类型:float16

## exWindow

exWindow来源于[swin\_transformer](https://github.com/microsoft/Swin-Transformer/blob/main/models/swin_transformer.py)的window\_partition和window\_reverse操作。 原论文中输入特征被划分为多个不重叠的窗口，每个窗口的大小为window\_size× window\_size。要求输入和输出特征都为4维shape，在高和宽方向上都进行划分。 pytorch实现的计算方法如下:

173

<!-- page 174 of 374 -->

```python
def window_partition(x, window_size):
    """
    Args:
        x: (B, C, H, W)
        window_size (int): window size
    Returns:
        windows: (B, C, num_windows * num_windows, window_size * window_size)
    """
    B, C, H, W = x.shape
    x = x.view(B, C, H // window_size, window_size, W // window_size, window_size)
    windows = x.permute(0, 1, 2, 4, 3, 5).contiguous().view(B, C, -1, window_size * window_size)
    return windows

def window_reverse(windows, window_size, H, W):
    """
    Args:
        windows: (B, C, num_windows * num_windows, window_size * window_size)
        window_size (int): Window size
        H (int): Height of image
        W (int): Width of image
    Returns:
        x: (B, C, H, W)
    """
    B, C, _, _ = windows.shape
    x = windows.view(B, C, H // window_size, W // window_size, window_size, window_size)
    x = x.permute(0, 1, 2, 4, 3, 5).contiguous().view(B, C, H, W)
    return x
```

```txt
输入列表
• X:T1
    • shape:[batch,channel,height,width]

输出列表
• Y:T1
    • shape:[batch,channel,height,width]

数据类型约束
• T1:int8(Tensor),float16(Tensor)

属性列表
• mode:string
    • 支持模式:partition,reverse,partition_num_first
        • partition:参考window_partition实现;
        • reverse:参考window_reverse实现;
        • partition_num_first: 与 partition 的区别在于, partition_num_first 的 H,W 按照 num_windows进行划分, 而partition的H,W按照window_sizes进行划分。
```

174

<!-- page 175 of 374 -->

window\_sizes:listofints

2维向量,窗口的大小。定义了每个窗口的高度和宽度。窗口内的注意力计算和特征提取都是基于这个大小。

num\_windows:listofints

2维向量,窗口的数量。定义了输入特征的高度和宽度被划分为多少个窗口。

## 其他支持

多核联合:尚不支持

## RV1103/RV1106

## Add

执行元素级二进制加法(C=A+B),支持多向Numpy样式的广播

输入列表

A:T1,T2 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

B:T1,T2 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

输出列表

C:T1 shape:[batch,channel,height,width]量化支持per-layer

175

<!-- page 176 of 374 -->

## 数据类型约束

T1:int8(Tensor)

T2:float(constTensor)

## AddRelu

Add与Relu融合计算,C=Relu(A+B)输入列表同Add输出列表同Add其他支持多核联合:支持

## BatchNormalization

按照论文[https://arxiv.org/abs/1502.03167](https://arxiv.org/abs/1502.03167)中的描述对输入张量进行批量归一化计算

输入列表

input:T1 shape:[batch,channel,height,width]量化支持per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

属性列表

epsilon:float（默认值=1e-5）

176

<!-- page 177 of 374 -->

除以标准差时加上防止除0的实数

epsilon∈(0,∞]

momentum:float

训练时的滑动平均参数

## Concat

将一系列向量在axis指定的方向上组合成一个向量，所有向量除axis指定的方向外大小必须相同输入列表

量化支持per-layer

输出列表

output:T

shape:[batch,channel,height,width]

量化支持per-layer

数据类型约束

T:int8(Tensor),float16(Tensor)

属性列表

axisint64 axis∈{0,1,2,3}

## Convolution

卷积

输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

width: 当dilated\_kernel\_h>1时,width<16383。此外,对首层输入width存在限制，详见模型输入说明。

177

<!-- page 178 of 374 -->

## 量化支持

per-layer

## weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,31]

kernel\_w∈[1,31]

量化支持

per-layer

per-channel

## 输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 属性列表

strides:int(strides\_h,strides\_w)

stride\_h∈[1,7]

stride\_w∈[1,7]

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right)

pads\_top∈[0,15]

pads\_left∈[0,15]

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,31]

dilations\_w∈[1,31]

## 数据类型约束

T1:int8(Tensor)

## Depthwise Convolution

深度可分离卷积

178

<!-- page 179 of 374 -->

## 输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

width: 当dilated\_kernel\_h>1时,width<16383。此外,对首层输入width存在限制，详见模型输入说明。

量化支持

per-layer

weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,8]

kernel\_w∈[1,8]

量化支持

per-layer

per-channel

## 输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 属性列表

strides:int(strides\_h,strides\_w)

stride\_h∈[1,7]

stride\_w∈[1,7]

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right)

pads\_top∈[0,15]

pads\_left∈[0,15]

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,32]

dilations\_w∈[1,32]

## 数据类型约束

179

<!-- page 180 of 374 -->

T1:int8(Tensor)

## ConvolutionRelu

Convolution与Relu融合计算,Output=Relu(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionClip

Convolution与Clip融合计算,Output=Clip(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionPRelu/LeakyRelu

Convolution 与 PRelu/LeakyRelu 融合计算, Output = PRelu(Conv(Input)) 或者 Output =

LeakyRelu(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionAdd

Convolution与Add融合计算,Output=Add(Conv(Input0),Input1) 说明及规格限制同Convolution

## ConvolutionSigmoid

Convolution与Sigmoid融合计算,Output=Sigmoid(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionTanh

Convolution与Tanh融合计算,Output=Tanh(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionSoftplus

Convolution与Softplus融合计算,Output=Softplus(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionHardSigmoid

Convolution与HardSigmoid融合计算,Output=HardSigmoid(Conv(Input)) 说明及规格限制同

Convolution

## ConvolutionHardSwish

Convolution与HardSwish融合计算,Output=HardSwish(Conv(Input)) 说明及规格限制同Convolution

180

<!-- page 181 of 374 -->

## ConvolutionElu

Convolution与Elu融合计算,Output=Elu(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionSwish

Convolution与Swish融合计算,Output=Swish(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionMish

Convolution与Mish融合计算,Output=Mish(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionAddRelu

Convolution与Add及Relu融合计算,Output=Relu(Add(Conv(Input0),Input1)) 说明及规格限制同Convolution

## ConvTranspose

转置卷积

输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

width: 当dilated\_kernel\_h>1时,width<16383。此外,对首层输入width存在限制，详见模型输入说明。

量化支持

per-layer

weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,31]

kernel\_w∈[1,31]

量化支持

per-layer

per-channel

输出列表

181

<!-- page 182 of 374 -->

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 属性列表

strides:int(strides\_h,strides\_w)

stride\_h∈[1,8]

stride\_w∈[1,8]

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right) 设置pad时注意: 不支持kernel\_h**dilations\_h-dilations\_h-pads\_top<0** 不支持**kernel\_w**dilations\_w-dilations\_wpads\_left<0 不支持stride\_h**(height-1)-pads\_top+1<output\_h** 不支持**stride\_w**(width-1)- pads\_left+1<output\_w

pads\_top∈[0,15]

pads\_left∈[0,15]

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

group:仅支持1,当且仅当num\_input=num\_output时支持num\_output

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,32]

dilations\_w∈[1,32]

当dilation不等于(1,1)时，只支持kernel=(1,1)

## 数据类型约束

T1:int8(Tensor)

## ConvTranposeRelu

ConvTranpose与Relu融合计算,Output=Relu(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeClip

ConvTranpose与Clip融合计算,Output=Clip(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposePRelu/LeakyRelu

182

<!-- page 183 of 374 -->

ConvTranpose与PRelu/LeakyRelu融合计算,Output=PRelu(ConvTranpose(Input))或者Output= LeakyRelu(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeAdd

ConvTranpose与Add融合计算,Output=Add(ConvTranpose(Input0),Input1) 说明及规格限制同

ConvTranspose

## ConvTranposeSigmoid

ConvTranpose与Sigmoid融合计算,Output=Sigmoid(ConvTranpose(Input)) 说明及规格限制同

ConvTranspose

## ConvTranposeTanh

ConvTranpose与Tanh融合计算,Output=Tanh(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeSoftplus

ConvTranpose与Softplus融合计算,Output=Softplus(ConvTranpose(Input)) 说明及规格限制同

ConvTranspose

## ConvTranposeHardSigmoid

ConvTranpose与HardSigmoid融合计算,Output=HardSigmoid(ConvTranpose(Input))

## ConvTranposeHardSwish

ConvTranpose与HardSwish融合计算,Output=HardSwish(ConvTranpose(Input)) 说明及规格限制同

ConvTranspose

## ConvTranposeElu

ConvTranpose与Elu融合计算,Output=Elu(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeSwish

ConvTranpose与Swish融合计算,Output=Swish(ConvTranpose(Input)) 说明及规格限制同

ConvTranspose

183

<!-- page 184 of 374 -->

## ConvTranposeMish

ConvTranpose与Mish融合计算,Output=Mish(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## Div

执行元素级二进制除法(C=A/B),支持多向Numpy样式的广播

输入列表

A:T1,T2

shape:[batch,channel,height,width]

量化支持per-layer

广播支持支持任意维度广播操作广播约束同Expand算子

B:T1,T2 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

输出列表

C:T1 shape:[batch,channel,height,width]量化支持per-layer

数据类型约束

T1:float16(Tensor)

T2:float(constTensor)

## Expand

184

<!-- page 185 of 374 -->

根据给定的 shape 和广播规则广播输入张量。广播规则类似于 numpy.array(input) \* numpy.ones(shape):维度右对齐；两个对应维度必须具有相同的值，或者其中一个等于1输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

shape:T2

shape:[batch,channel,height,width]

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor)

T2:int64(Tensor)

广播约束

[b,c,1,w]->[b,c,h,w],h∈[1,8192]

[b,1,1,w]->[b,c,h,w],h∈[1,8192]

[b,c,h,1]->[b,c,h,w],w ∈[1,8192]

[b,1,h,1]->[b,c,h,w],w ∈[1,8192]

[b,c,1,1]->[b,c,h,w],h∈[1,8192],w ∈[1,8192]

## Hardmax

输入列表

input:T1

shape:[batch,channel,height,width]

channel∗height∗width<=8192

axis=1,height∗width<16384且height∗width等于1或大于8;

axis=3/-1,channel ∗ height < 16384, 且 channel ∗ height 等于 1 或大于 8，且受限于transpose的规格限制

185

<!-- page 186 of 374 -->

## 输出列表

output:T1

shape:[batch,channel,height,width]

数据类型约束

T1:int8(Tensor),float16(Tensor)

属性列表

axis:int

做hardmax的轴:1,3/-1，即channel和width方向

其他支持

多核联合:尚不支持

## LSTM

长短期记忆网络（LSTM，Long Short-Term Memory） LSTM扩展以及变体命名为exLSTM算子，参数项中指明 （extern）的项为exLSTM独有的参数项。 计算公式如下:

输入列表

X:T1

shape:[seq\_length,batch\_size,input\_size]

seqlength∈(0,8192]

batchsize∈(0,8192],大于1时仅支持4的倍数

inputsize∈(0,8192]

量化支持

per-layer

W:T1

shape:[num\_directions,4\*hidden\_size,input\_size]

inputsize∈(0,8192]

hiddensize∈(0,8192]

numdirections:1or2

量化支持

per-layer

186

<!-- page 187 of 374 -->

## per-channel

- • R:T1
- • shape:[num\_directions,4\*hidden\_size,hidden\_size]
- • hiddensize∈(0,8192]
- • numdirections:1or2
- • 量化支持
- • per-layer
- • per-channel
- • B:T2
- • shape:[num\_directions,8\*hidden\_size]
- • hiddensize∈(0,8192]
- • numdirections:1or2
- • 量化支持
- • per-layer
- • per-channel
- • sequence\_lens:T3(optional)
- • shape:[batch\_size]
- • batchsize∈(0,8192],大于1时仅支持4的倍数
- • initial\_h:T1(optional)
- • shape:[num\_directions,batch\_size,hidden\_size]
- • numdirections:1or2
- • batchsize∈(0,8192],大于1时仅支持4的倍数
- • hiddensize∈(0,8192]
- • 量化支持
- • per-layer
- • initial\_c:T3(optional)
- • shape:[num\_directions,batch\_size,hidden\_size]
- • numdirections:1or2
- • batchsize∈(0,8192],大于1时仅支持4的倍数
- • hiddensize∈(0,8192]
- • 量化支持
- • per-layer

## 输出列表

187

<!-- page 188 of 374 -->

## Y:T1

shape:[seq\_length,num\_directions,batch\_size,hidden\_size]

seqlength∈(0,8192]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

Y\_h:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

Y\_c:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

## 属性列表

direction(extern):string

指定LSTM的运算方向

forward:指定LSTM的运算方向为前向

reverse:指定LSTM的运算方向为反向

bidirectional:指定LSTM的运算方向为双向

sequence\_size(extern):int

指定LSTM输入的seqsize，无限制，建议4对齐

hidden\_size(extern):int

LSTM单元中的hiddensize，无限制，建议8对齐

## proj\_size(extern):int

projection时的proj\_size，projsize∈[0,hiddensize]

188

<!-- page 189 of 374 -->

目前限定0，即尚不支持projection功能

input\_forget(extern):int

cifg变种的选择:1(T)or0(F) 目 前限定0，即尚不支持

has\_projection(extern):int

projection变种:1(T)or0(F) 目 前限定0，即尚不支持

input\_layout(extern):int

指定与对应输入shape含义一致的layout

要求填写指定的layout，同时要求填写该op实际对应的batch\_size、sequence\_size、hidden\_size。

snc:指定layout对应的输入shape为[seqs,batches,input\_size]

(sn)c:指定layout对应的输入shape为[seqs\*batches,input\_size,1,1]

## output\_layout(extern):int

指定与对应输出shape含义一致的layout

要求填写指定的layout，同时要求填写该op实际对应的batch\_size、sequence\_size、hidden\_size、directions。

sbnc:指定layout对应的输出shape为[seqs,directions,batches,hidden\_size]

(sn)c:指定layout对应的输出shape为[seqsbatches,directionsinput\_size,1,1]

## 数据类型约束

T1:int8(Tensor)

T2:int32(Tensor)

T3:int(Scalar)

## 其他支持

## 多核联合:暂不支持

## Max

计算输入张量的元素级最大值

输入列表

A:T1

shape:[batch,channel,height,width]

量化支持

per-layer

广播支持

支持任意维度广播操作

广播约束同Expand算子

189

<!-- page 190 of 374 -->

## B:T1

shape:[batch,channel,height,width]

量化支持per-layer

广播支持支持任意维度广播操作广播约束同Expand算子

## 输出列表

C:T1

shape:[batch,channel,height,width]

量化支持per-layer/per-channel

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:暂不支持

## Min

计算输入张量的元素级最小值

输入列表

A:T1 shape:[batch,channel,height,width]

量化支持per-layer

广播支持支持任意维度广播操作广播约束同Expand算子

B:T1 shape:[batch,channel,height,width]量化支持per-layer

190

<!-- page 191 of 374 -->

广播支持支持任意维度广播操作广播约束同Expand算子

## 输出列表

C:T1 shape:[batch,channel,height,width]量化支持per-layer/per-channel

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:暂不支持

## Mul

执行元素级二进制乘法(C=A\*B),支持多向Numpy样式的广播

## 输入列表

A:T1,T2 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

B:T1,T2 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

## 输出列表

191

<!-- page 192 of 374 -->

C:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor)

T2:float(constTensor)

## MulRelu

Mul与Relu融合计算,C=Relu(A\*B)

输入列表

同Mul

输出列表

同Mul

其他支持

多核联合:支持

## Pad

给定一个包含要填充的数据的张量(data),包含轴的开始和结束填充数值的张量(pads),模式(mode),常量数值(constant\_value),生成一个填充张量(output)

输入列表

data:T1

shape:[batch,channel,height,width]

量化支持

per-layer

pads:T2

shape : [batch\_begin, channel\_begin, height\_begin, width\_begin, batch\_end, channel\_end,height\_end,width\_end]

constant\_value(optional):T3

shape:[1]

量化支持

192

<!-- page 193 of 374 -->

## per-layer

## 输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor)

T2:int64(Tensor)

T3:float(Scalar),int8(Scalar),float16(Scalar)

属性列表

mode:string(默认值constant)

支持模式:constant,reflect

constant无限制

reflectchannel∈(0,8192],height∈(0,8192],width∈(0,8176]

其他支持

多核联合:尚不支持

## MaxPool

MaxPool消耗输入张量X并根据内核大小、步幅大小和pad长度在张量上应用最大池化。最大池化包括根据内核大小计算输入张量子集的所有值的最大值，并将数据下采样到输出张量Y中以进行进一步处理。 输出空间形状的计算方式有所不同，具体取决于是否使用显式填充（在使用pads的情况下）或使用 自 动填充（在使用auto\_pad的情况下）。仅使用显式填充

输入列表

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

height∈(0,8192]

width∈(0,8192]

输出列表

output:T1

193

<!-- page 194 of 374 -->

shape:[batch,channel,height,width]

## 属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

kernel\_h∈(0,7]

kernel\_w∈(0,7]

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

storage\_order:int64[]

优先储存方式:0

数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## GlobalMaxPool

GlobalMaxPool使用输入张量X并对同一通道中的值应用最大池化。这相当于MaxPool的kernel\_shape 大小等于input的空间维度。

输入列表

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

194

<!-- page 195 of 374 -->

height∈(0,7]

width∈(0,7]

## 输出列表

output:T1

shape:[batch,channel,height,width]

## 属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

kernel\_h∈(0,7]

kernel\_w∈(0,7]

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## AveragePool

AveragePool使用输入张量X并根据内核大小、步幅大小和pad长度在张量上应用平均池化。平均池化包括根据内核大小计算输入张量子集的所有值的平均值，并将数据下采样到输出张量Y中以进行进一步处理。输出空间形状的计算方式有所不同，具体取决于是否使用显式填充（在使用pads的情况下）或使用 自动填充（在使用auto\_pad的情况下）。仅使用显式填充

195

<!-- page 196 of 374 -->

## 输入列表

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

height∈(0,8192]

width∈(0,8192]

## 输出列表

output:T1

shape:[batch,channel,height,width]

## 属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

kernel\_h∈(0,7]

kernel\_w∈(0,7]

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

196

<!-- page 197 of 374 -->

## GlobalAveragePool

GlobalAveragePool使用输入张量X并对同一通道中的值应用平均池化。这相当于AveragePool，其kernel\_shape大小等于输入张量的空间维度。

输入列表

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

height∈(0,7]

width∈(0,7]

输出列表

output:T1

shape:[batch,channel,height,width]

属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

kernel\_h∈(0,7]

kernel\_w∈(0,7]

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

197

<!-- page 198 of 374 -->

T2:float(Tensor)

T3:float(Scalar)

## Pow

Z =XY 指数运算，采用输入数据（张量）和指数，并产生一个输出数据（张量）

输入列表

X:T1 shape:[batch,channel,height,width]量化支持per-layer

Y:T2 shape:[1]当前仅支持0、1、2、3、0.5、-0.5

输出列表

Z:T1 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:int8(Tensor),int32(Tensor),int64(Tensor),float16(Tensor),float(Tensor)

## 其他支持

多核联合:尚不支持

## Relu

将输入张量的负值设为零，正值保持不变

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

198

<!-- page 199 of 374 -->

## per-layer

广播支持

## 无

## 输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:暂不支持

## Clip/ReLU6

将输入张量的值裁剪到[0,6]范围内

输入列表

input:T1 shape:[batch,channel,height,width]量化支持per-layer广播支持无

输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

199

<!-- page 200 of 374 -->

## 其他支持

多核联合:暂不支持

## PRelu

将输入张量的负值按可学习参数缩放，正值保持不变

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持per-layer/per-channel

广播支持无

输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer/per-channel

属性列表

slope:PRelu系数仅支持单个标量或C维度系数

数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:暂不支持

## LeakyRelu

将输入张量的负值按固定比例缩放，正值保持不变

输入列表

input:T1

shape:[batch,channel,height,width]

200

<!-- page 201 of 374 -->

量化支持per-layer广播支持无

## 输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:暂不支持

## Reshape

在不改变输入数据和元素数量的情况下，返回一个具有指定形状的张量。

输入列表

input:T1 shape:[batch,channel,height,width]量化支持per-layer

输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

属性列表

201

<!-- page 202 of 374 -->

shape:int指定输出张量的形状

其他支持

多核联合:尚不支持

## Resize

调整输入张量的大小。一般来说，它将输出张量中的每个值计算为输入张量中邻域（即采样位置）的加权平均值

输入列表

X:T1 shape:[batch,channel,height,width]量化支持per-layer

roi(optional):T2目前暂不支持

scales(optional):T2沿每个维度的缩放比例数组

sizes(optional):T3输出张量的目标大小

输出列表

Y:T1 shape:[batch,channel,height,width]量化支持per-layer

数据类型约束

T1:int8(Tensor)

T2:float(Tensor)

T3:int64(Tensor)

属性列表

antialias:int（默认值为0）目前不支持设置

202

<!-- page 203 of 374 -->

axes:int[]目前不支持设置

coordinate\_transformation\_mode:strings（默认值为”half\_pixel”）目 前仅支持half\_pixel，pytorch\_half\_pixel，align\_corners三种

cubic\_coeff\_a:float（默认为-0.75）目前不支持设置

exclude\_outside:int（默认值为0）目前不支持设置

extrapolation\_value:float（默认为0）目前不支持设置

keep\_aspect\_ratio\_policy:strings（默认值为”stretch”）目前不支持设置

mode:strings（默认值为”nearest”）目 前仅支持nearest和linear两种可配置

nearest\_mode:strings（默认值为”round\_prefer\_floor”）

目前不支持设置支持说明 目前仅支持宽高方向的整数倍缩放,且缩放倍数为2-8的整数倍,如果是(1,c,1,1)则支持放大到(1,c,h, w)

## Slice

获得当前向量的一个切片，具体规则和[numpy切片](https://numpy.org/doc/stable/user/basics.indexing.html)相同

输入列表

input\_tensor:T

shape:[batch,channel,height,width]

量化支持per-layer

输出列表

output:T

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T:int8(Tensor),float16(Tensor)

203

<!-- page 204 of 374 -->

## 属性列表

starts:int(Tensor)

切分的起始位置:无限制

ends:int(Tensor)

切分的终止位置:无限制

axes:int(Tensor)

选取切分的轴:支持任意0\~3轴，支持同时多轴选择

选取切分对应轴的步长

```javascript
当height*width==1&&channel%subc==0&&starts[1]%subc==0&&ends[1]% subc==0&&steps[1]<=subc时,steps可以不为1，否则只有steps==[1,1,1,1]时，才可通过 NPU运行SliceOP
```

## Softmax

该运算符计算给定输入的归一化指数值:

```txt
Softmax(input, axis) = exp(input - max(input, axis)) / Σ_axis exp(input - max(input, axis))
```

“axis”属性表示Softmax执行的维度。输出张量具有相同的形状并包含相应输入的Softmax值。

输入列表

```txt
- input:T1
    - shape:[batch,channel,height,width]
    - 受限于transpose的规格限制
```

输出列表

output:T1

shape:[batch,channel,height,width]

数据类型约束

```txt
- T1:int8(Tensor),float16(Tensor)
```

属性列表

axis:int

做softmax的轴:1,3，即channel和width方向

204

<!-- page 205 of 374 -->

## exSoftmax13

该运算符计算给定输入的归一化指数值:

```txt
exSoftmax13(input, axis) = exp(input - max(input, axis)) / Σ_axis exp(input max(input, axis))
```

“axis”属性表示Softmax执行的维度。输出张量具有相同的形状并包含相应输入的Softmax值。

输入列表

input:T1

shape:[batch,channel,height,width]

受限于transpose的规格限制

输出列表

output:T1

shape:[batch,channel,height,width]

数据类型约束

T1:int8(Tensor),float16(Tensor)

属性列表

axis:int64

做softmax的轴:1,3，即channel和width方向

## exSoftmaxMask

该运算符计算给定输入的归一化指数值:

$$
\begin{array}{c} \text {input} (x, m a s k _ {-} t, m a s k _ {-} v a l u e) = \left\{ \begin{array}{l l} x + (m a s k _ {t} - 1) * i n f & \text {if mask\_value = 0} \\ x + m a s k _ {t} * (- i n f) & \text {elif mask\_value = 1} \end{array} \right. \\ \text {exSoftmaxMask(input, axis)} = \frac {\exp (i n p u t - \max (i n p u t , a x i s))}{\sum_ {a x i s} \exp (i n p u t - \max (i n p u t , a x i s))} \end{array}
$$

"axis"属性表示Softmax执行的维度。输出张量具有相同的形状并包含相应输入的Softmax值。

输入列表

input:T1

shape:[batch,channel,height,width]

受限于transpose的规格限制

205

<!-- page 206 of 374 -->

mask(optional):T1

shape:[1,channel,height,width]

channel∈(0,8192]

width: · axis=1,无限制; · axis=3/-1,width∈(0,8192]

输出列表

output:T1

shape:[batch,channel,height,width]

数据类型约束

T1:int8(Tensor),float16(Tensor)

属性列表

axis:int64

做softmax的轴:1,3，即channel和width方向

mask\_value:int64

需要mask的值:0,1

## Split

将向量沿着axis方向分成num\_outputs个向量，split用于指定切分后向量在axis方向上的大小

输入列表

input\_tensor:T

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T

一或多个输出向量，由num\_outputs属性决定

shape:根据切分情况决定

量化支持

per-layer

## 数据类型约束

T:int8(Tensor),float16(Tensor)

206

<!-- page 207 of 374 -->

## 属性列表

axis:int axis∈{0,1,2,3}

num\_outputs:int

split:int(Tensor)

## Sub

执行元素级二进制减法(C=A-B),支持多向Numpy样式的广播

输入列表

A:T1,T2

shape:[batch,channel,height,width]

量化支持per-layer

广播支持[b,c,1,1] [scalar]

B:T1,T2

shape:[batch,channel,height,width]

量化支持per-layer

广播支持[b,c,1,1] [scalar]

输出列表

C:T1

shape:[batch,channel,height,width]

量化支持per-layer

数据类型约束

T1:int8(Tensor)

T2:float(constTensor)

207

<!-- page 208 of 374 -->

## Tile

通过平铺给定的张量构造张量,这与Numpy中的函数tile相同，但没有广播输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

repeats:T2

shape:[batch,channel,height,width]

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:int64(Tensor)

## Transpose

对输入张量进行转置

输入列表

X:T1

shape:[n1,c1,h1,w1]详细约束规则见属性列表

量化支持

per-layer

输出列表

Y:T1,T2

shape:[n2,c2,h2,w2]

详细约束规则见属性列表

208

<!-- page 209 of 374 -->

量化支持per-layer

## 属性列表

perm转置的轴顺序: 不同perm参数限制如下:(其中p=8192,q=2048) perm=[0,1,2,3]无限制perm=[0,1,3,2] T1:h1%16=0,h1**w1<16**p,h1**w1<2**q T2:h1%8=0,h1**w1<8**p,h1**w1<2**q perm=[0,2,3,1] T1:c1<8192,h1**w1%8=0**， **w1**c1<p\*16 T2:c1<8192,h1**w1%8=0**， **w1**c1<p\*8 perm=[0,2,1,3] T1:h1%16=0,h1**w1<16**p,h1**w1<2**q,c1\*w1<p T2:h1%8=0,h1**w1<8**p,h1**w1<2**q,c1\*w1<p perm=[0,3,1,2] T1,T2:h1**w1<p,w1<8192,h1**c1<p perm=[0,3,2,1] T1:h1%16=0,h1**w1<16**p,h1**w1<2**q,c1<p\*16 T2:h1%8=0,h1**w1<8**p,h1**w1<2**q,c1<p\*8 perm=[1,0,2,3] T1:h1**w1<16**p,n1<8192,h1\*w1<p T2:h1**w1<8**p,n1<8192,h1\*w1<p perm=[1,0,3,2] T1:h1%16=0,c1**h1**w1<16**p,h1**w1<2\*q T2:h1%8=0,c1**h1**w1<8**p,h1**w1<2\*q perm=[1,2,0,3] T1:n1**w1<p**16,c1**h1**w1<p,w1%16=0 T2:n1**w1<p**8,c1**h1**w1p,w1%8=0 perm=[1,2,3,0] T1:h1**w1<p,n1<p**16,c1**h1**w1<p**16,n1**w1<p\*16 T2:h1**w1<p,n1<p**8,c1**h1**w1<p**8,n1**w1<p\*8 perm=[1,3,0,2] T1:c1**w1<8192,n1**h1<p,w1%16=0

209

<!-- page 210 of 374 -->

```csv
T2:c1w1<8192,n1h1<p,w1%8=0
    perm=[1,3,2,0]
    T1:c1h1w1<p,n1*h1<p,w1<8192,w1%16=0
    T2:c1h1w1<p,n1*h1<p,w1<8192,w1%8=0
    perm=[2,1,0,3]
    T1,T2:c1<8192,c1h1w1<p,n1*w1<p
    perm=[2,1,3,0]
    T1:c1h1w1<p,n1w1<p16,c1<8192,n1*w1%4=0
    T2:c1h1w1<p,n1w1<p8,c1<8192,n1*w1%4=0
    perm=[2,0,3,1]
    T1,T2:c1<8192,c1h1w1<p
    perm=[2,0,1,3]
    T1:n1c1h1w1<p,h1w1%16=0
    T2:n1c1h1w1<p,h1w1%8=0
    perm=[2,3,1,0]
    T1:c1h1w1<p,n1c1<p,h1w1<8192,h1*w1%16=0
    T2:c1h1w1<p,n1c1<p,h1w1<8192,h1*w1%8=0
    perm=[2,3,0,1]
    T1,T2:h1w1<8192,n1c1<p
    perm=[3,0,2,1]
    T1:h1w1<p,n1c1<8192,c1h1<p,n1w1<8192,n1*w1%16=0
    T2:h1w1<p,n1c1<8192,c1h1<p,n1w1<8192,n1*w1%8=0
    perm=[3,0,1,2]
    T1:h1w1<p,n1c1<8192,c1h1<p,n1w1<8192,n1h1w1%16=0
    T2:h1w1<p,n1c1<8192,c1h1<p,n1w1<8192,n1h1w1%8=0
    perm=[3,2,0,1]
    T1,T2:h1w1<p,n1c1<8192,n1c1w1<p
    perm=[3,2,1,0]
    T1:c1h1w1<p,h1w1<8192,2h1w1<q,n1c1<p*16,h1%16=0
    T2:c1h1w1<p,h1w1<8192,2h1w1<q,n1c1<p*8,h1%8=0
    perm=[3,1,0,2]
    T1,T2:h1w1<p,c1w1<8192,n1*h1<p
    perm=[3,1,2,0]
    T1,T2:h1w1<p,n1c1<8192,n1h1<p,n1c1*w1<p
```

## 数据类型约束

210

<!-- page 211 of 374 -->

T1:int8(Tensor)

T2:int16(Tensor),float16(Tensor)

## 其他支持

多核联合:暂不支持

## Sigmoid

给定输入张量，函数y=1/(1+exp(-x))按元素应用于输入张量，得到输出张量

输入列表

input:T1 shape:[batch,channel,height,width]量化支持per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## Tanh

计算给定输入张量单元的双曲正切

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

211

<!-- page 212 of 374 -->

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## Softplus

按元素应用Softplus函数,y=ln(exp(x)+1)

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## HardSigmoid

给定输入张量，函数y=max(0,min(1,alpha\*x+beta))按元素应用于输入张量，得到输出张量，这里alpha=1/6，beta=0.5

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

212

<!-- page 213 of 374 -->

T1:int8(Tensor),float16(Tensor)

## HardSwish

按元素应用 HardSwish 函数, y = x \* max(0, min(1, alpha \* x + beta)) = x \* HardSigmoid(x),这里${ \mathsf { a l p h a } } { = } 1 / 6 { , } { \mathsf { b e t a } } { = } 0 . 5$

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

## Elu

给定输入张量，函数f(x)=alpha\*(exp(x)-1.)forx<0,f(x)=xforx>=0按元素应用于输入张量，得到输出张量，这里alpha=1

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

213

<!-- page 214 of 374 -->

T1:int8(Tensor),float16(Tensor)

## exSwish

按元素应用Sigmoid线性单元函数,Swish函数也称为SiLU函数,y=x\*sigmoid(x)

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

## exMish

给定输入张量，函数mish(x)=x**tanh(softplus(x))=x**tanh(ln(1+e^{x}))按元素应用于输入张量，得到输出张量

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

214

<!-- page 215 of 374 -->

## exGelu

给定输入张量，函数y =qx∗Φ(x)按元素应用于输入张量，得到输出张量，当Φ(x)函数设置成tanh时， y =0.5∗x∗(1+Tanh( 2 ∗(x+0.044715∗x3))) π

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## Where

根据mask\_tensor获取x\_tensor或y\_tensor的值，当mask\_tensor位置为True时，取x\_tensor对应位置的值，否则取y\_tensor的值。

输入列表

mask\_tensor:T1 shape:[batch,channel,height,width]广播支持支持任意维度广播操作广播约束广播约束同Expand算子

x\_tensor:\*T2

shape:[batch,channel,height,width]

量化支持

per-layer

广播支持

215

<!-- page 216 of 374 -->

## 支持任意维度广播操作

广播约束

广播约束同Expand算子

## y\_tensor:T1

shape:[batch,channel,height,width]

量化支持

per-layer

广播支持

支持任意维度广播操作

广播约束

广播约束同Expand算子

输出列表

output:T2

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:bool(Tensor)

T2:int8(Tensor),float16(Tensor)

## exGlu

门控线性单元(GatedLinearUnit)函数,其中a是输入矩阵的前一半,b是后一半 GLU(a,b)=a⊗σ(b)

输入列表

Input:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Output:T1

shape:[batch,channel/2,height,width]

量化支持:per-layer

## 数据类型约束

216

<!-- page 217 of 374 -->

## T1:int8(Tensor),float16(Tensor)

## 属性列表

axis:int(默认值=1)

分割输入的维度

约束:仅支持1

## exMatMul

矩阵乘法操作

$$
Y = \left\{ \begin{array}{l l} A \cdot B + C & \text {if} c _ {-} t y p e = " \text {add}" \\ A \cdot B * C & \text {if} c _ {-} t y p e = " \text {mul}" \end{array} \right.
$$

## 输入列表

A:T1 shape:[b,k,1,n] k ∈(0,8192]量化支持per-layer

B:T1 shape:[b,k,1,m]量化支持per-layer

C(optional):T1,T2 shape:[b,n,1,m]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

## 输出列表

Y:T1 shape:[b,n,1,m]量化支持

217

<!-- page 218 of 374 -->

per-layer

## 数据类型约束

T1:int8(Tensor)

T2:float(Tensor)

属性列表

c\_type:strings(默认值“add”)

支持add和mul可选,表示C是做加法还是乘法

## exSDPAttention

计算查询(query)、键(key)和值(value)之间的缩放点积注意力(SDPA)

输入列表

query:T1 shape:[batch,channel,height,width] channel∈(0,8192]量化支持per-layer

key:T1 shape:[batch,channel,height,width]量化支持per-layer

value:T1 shape:[batch,channel,height,width] channel∈(0,8192]量化支持per-layer

mask(optional):T1,T2 shape:[batch,channel,height,width]量化支持per-layer广播支持默认支持任意维度广播操作

218

<!-- page 219 of 374 -->

```txt
• scale(optional):T3
```

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:int8(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## exWindow

exWindow来源于[swin\_transformer](https://github.com/microsoft/Swin-Transformer/blob/main/models/swin_transformer.py)的window\_partition和window\_reverse操作。 原论文中输入特征被划分为多个不重叠的窗口，每个窗口的大小为window\_size× window\_size。要求输入和输出特征都为4维shape，在高和宽方向上都进行划分。 pytorch实现的计算方法如下:

```python
def window_partition(x, window_size):
    """
    Args:
        x: (B, C, H, W)
        window_size (int): window size
    Returns:
        windows: (B, C, num_windows * num_windows, window_size * window_size)
    """
    B, C, H, W = x.shape
    x = x.view(B, C, H // window_size, window_size, W // window_size, window_size)
    windows = x.permute(0, 1, 2, 4, 3, 5).contiguous().view(B, C, -1, window_size * window_size)
    return windows

def window_reverse(windows, window_size, H, W):
    """
    Args:
        windows: (B, C, num_windows * num_windows, window_size * window_size)
        window_size (int): Window size
        H (int): Height of image
        W (int): Width of image
    Returns:
        x: (B, C, H, W)
    """
    B, C, _, _ = windows.shape
    x = windows.view(B, C, H // window_size, W // window_size, window_size, window_size)
    x = x.permute(0, 1, 2, 4, 3, 5).contiguous().view(B, C, H, W)
    return x
```

219

<!-- page 220 of 374 -->

## 输入列表

X:T1

shape:[batch,channel,height,width]

## 输出列表

Y:T1

shape:[batch,channel,height,width]

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 属性列表

mode:string

支持模式:partition,reverse,partition\_num\_first

partition:参考window\_partition实现;

reverse:参考window\_reverse实现;

partition\_num\_first: 与 partition 的区别在于，partition\_num\_first 的 H,W 按照num\_windows进行划分，而partition的H,W按照window\_sizes进行划分。

window\_sizes:listofints

2维向量,窗口的大小。定义了每个窗口的高度和宽度。窗口内的注意力计算和特征提取都是基于这个大小。

num\_windows:listofints

2维向量,窗口的数量。定义了输入特征的高度和宽度被划分为多少个窗口。

## 其他支持

## 多核联合:尚不支持

## RK3576/RV1126B

## Add

执行元素级二进制加法(C=A+B),支持多向Numpy样式的广播

输入列表

A:T1,T2

shape:[batch,channel,height,width]

量化支持

per-layer

220

<!-- page 221 of 374 -->

## 广播支持

支持任意维度广播操作

广播约束同Expand算子

## B:T1,T2

shape:[batch,channel,height,width]

量化支持

per-layer

广播支持

支持任意维度广播操作

广播约束同Expand算子

## 输出列表

C:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(constTensor)

## 其他支持

多核联合:RK3576支持/RV1126B不支持

## AddRelu

Add与Relu融合计算,C=Relu(A+B)

输入列表

同Add

输出列表

同Add

其他支持

多核联合:RK3576支持/RV1126B不支持

221

<!-- page 222 of 374 -->

## BatchNormalization

按照论文[https://arxiv.org/abs/1502.03167](https://arxiv.org/abs/1502.03167)中的描述对输入张量进行批量归一化计算输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

属性列表

epsilon:float（默认值=1e-5）

除以标准差时加上防止除0的实数

epsilon∈(0,∞]

momentum:float

训练时的滑动平均参数

## 其他支持

多核联合:尚不支持

## Concat

将一系列向量在axis指定的方向上组合成一个向量，所有向量除axis指定的方向外大小必须相同输入列表

input\_tensor:T

shape:[batch,channel,height,width]

量化支持

per-layer

222

<!-- page 223 of 374 -->

## 输出列表

output:T shape:[batch,channel,height,width]量化支持per-layer

数据类型约束

T:int8(Tensor),float16(Tensor)

属性列表

axisint64

axis∈{0,1,2,3}

## Convolution

卷积

输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

width: 当dilated\_kernel\_h>1时,width<16383。此外,对首层输入width存在限制，详见模型输入说明。

量化支持per-layer

weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,31]

kernel\_w∈[1,31]

量化支持

per-layer

per-channel

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

223

<!-- page 224 of 374 -->

## per-layer

## 属性列表

strides:int(strides\_h,strides\_w)

stride\_h∈[1,7]

stride\_w∈[1,7]

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right)

pads\_top∈[0,15]

pads\_left∈[0,15]

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,31]

dilations\_w∈[1,31]

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:RK3576支持/RV1126B不支持

## Depthwise Convolution

深度可分离卷积

输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

width: 当dilated\_kernel\_h>1时,width<16383。此外,对首层输入width存在限制，详见模型输入说明。

量化支持

per-layer

weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,8]

kernel\_w∈[1,8]

224

<!-- page 225 of 374 -->

## 量化支持

per-layer

per-channel

## 输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 属性列表

strides:int(strides\_h,strides\_w)

stride\_h∈[1,7]

stride\_w∈[1,7]

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right)

pads\_top∈[0,15]

pads\_left∈[0,15]

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,32]

dilations\_w∈[1,32]

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:RK3576支持/RV1126B不支持

## ConvolutionRelu

Convolution与Relu融合计算,Output=Relu(Conv(Input)) 说明及规格限制同Convolution

## 其他支持

多核联合:RK3576支持/RV1126B不支持

225

<!-- page 226 of 374 -->

## ConvolutionClip

Convolution与Clip融合计算,Output=Clip(Conv(Input)) 说明及规格限制同Convolution其他支持

多核联合:RK3576支持/RV1126B不支持

## ConvolutionPRelu/LeakyRelu

Convolution 与 PRelu/LeakyRelu 融合计算, Output = PRelu(Conv(Input)) 或者 Output = LeakyRelu(Conv(Input)) 说明及规格限制同Convolution

其他支持

多核联合:RK3576支持/RV1126B不支持

## ConvolutionAdd

Convolution与Add融合计算,Output=Add(Conv(Input0),Input1) 说明及规格限制同Convolution其他支持

多核联合:RK3576支持/RV1126B不支持

## ConvolutionSigmoid

Convolution与Sigmoid融合计算,Output=Sigmoid(Conv(Input)) 说明及规格限制同Convolution其他支持

多核联合:RK3576支持/RV1126B不支持

## ConvolutionTanh

Convolution与Tanh融合计算, $\mathsf { . O u t p u t { = } T a n h ( C o n v ( I n p u t ) ) }$ 说明及规格限制同Convolution其他支持

多核联合:RK3576支持/RV1126B不支持

## ConvolutionSoftplus

Convolution与Softplus融合计算,Output=Softplus(Conv(Input)) 说明及规格限制同Convolution其他支持

多核联合:RK3576支持/RV1126B不支持

226

<!-- page 227 of 374 -->

## ConvolutionHardSigmoid

Convolution与HardSigmoid融合计算, $\mathsf { , O u t p u t { = } H a r d S i g m o i d ( C o n v ( I n p u t ) ) }$ 说明及规格限制同Convolution

其他支持

多核联合:RK3576支持/RV1126B不支持

## ConvolutionHardSwish

Convolution与HardSwish融合计算,Output=HardSwish(Conv(Input)) 说明及规格限制同Convolution其他支持

多核联合:RK3576支持/RV1126B不支持

## ConvolutionElu

Convolution与Elu融合计算, ${ \mathsf { { . O u t p u t } } } { = }  { \mathsf { { E I u } } } (  { \mathsf { { C o n v } } } (  { \mathsf { { I n p u t } } } ) )$ 说明及规格限制同Convolution其他支持

多核联合:RK3576支持/RV1126B不支持

## ConvolutionSwish

Convolution与Swish融合计算, $\mathsf { { , } O u t p u t { = } S w i s h ( C o n v ( I n p u t ) ) }$ 说明及规格限制同Convolution其他支持

多核联合:RK3576支持/RV1126B不支持

## ConvolutionMish

Convolution与Mish融合计算, $\mathsf { { , } O u t p u t { = } M i s h ( C o n v ( I n p u t ) ) }$ 说明及规格限制同Convolution其他支持

多核联合:RK3576支持/RV1126B不支持

## ConvolutionAddRelu

Convolution与Add及Relu融合计算, $\mathsf { _ { { } } , O u t p u t { = } R e l t ( A d d ( C o n v ( I n p u t 0 ) , I n p u t 1 ) ) }$ 说明及规格限制同Convolution

其他支持

227

<!-- page 228 of 374 -->

多核联合:RK3576支持/RV1126B不支持

## ConvTranspose

转置卷积

输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

width: 当dilated\_kernel\_h>1时,width<16383。此外,对首层输入width存在限制，详见模型输入说明。

量化支持

per-layer

weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,31]

kernel\_w∈[1,31]

量化支持

per-layer

per-channel

## 输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 属性列表

strides:int(strides\_h,strides\_w)

stride\_h∈[1,8]

stride\_w∈[1,8]

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right) 设置pad时注意: 不支持kernel\_h**dilations\_h-dilations\_h-pads\_top<0** 不支持**kernel\_w**dilations\_w-dilations\_wpads\_left<0 不支持stride\_h**(height-1)-pads\_top+1<output\_h** 不支持**stride\_w**(width-1)- pads\_left+1<output\_w

pads\_top∈[0,15]

pads\_left∈[0,15]

228

<!-- page 229 of 374 -->

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

group:仅支持1,当且仅当num\_input=num\_output时支持num\_output

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,32]

dilations\_w∈[1,32]

当dilation不等于(1,1)时，只支持kernel=(1,1)

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:暂不支持

## ConvTranposeRelu

ConvTranpose与Relu融合计算,Output=Relu(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeClip

ConvTranpose与Clip融合计算,Output=Clip(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposePRelu/LeakyRelu

ConvTranpose与PRelu/LeakyRelu融合计算,Output=PRelu(ConvTranpose(Input))或者Output=

LeakyRelu(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeAdd

ConvTranpose与Add融合计算,Output=Add(ConvTranpose(Input0),Input1) 说明及规格限制同

ConvTranspose

## ConvTranposeSigmoid

ConvTranpose与Sigmoid融合计算,Output=Sigmoid(ConvTranpose(Input)) 说明及规格限制同

ConvTranspose

229

<!-- page 230 of 374 -->

## ConvTranposeTanh

ConvTranpose与Tanh融合计算,Output=Tanh(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeSoftplus

ConvTranpose与Softplus融合计算,Output=Softplus(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeHardSigmoid

ConvTranpose与HardSigmoid融合计算,Output=HardSigmoid(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeHardSwish

ConvTranpose与HardSwish融合计算,Output=HardSwish(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeElu

ConvTranpose与Elu融合计算,Output=Elu(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeSwish

ConvTranpose与Swish融合计算,Output=Swish(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeMish

ConvTranpose与Mish融合计算,Output=Mish(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## Div

执行元素级二进制除法(C=A/B),支持多向Numpy样式的广播

输入列表

A:T1,T2

shape:[batch,channel,height,width]

量化支持

230

<!-- page 231 of 374 -->

## per-layer

## 广播支持

支持任意维度广播操作

广播约束同Expand算子

B:T1,T2

shape:[batch,channel,height,width]

量化支持

per-layer

广播支持

支持任意维度广播操作

广播约束同Expand算子

输出列表

C:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:float16(Tensor)

T2:float(constTensor)

## 其他支持

多核联合:不支持

## Expand

根据给定的 shape 和广播规则广播输入张量。广播规则类似于 numpy.array(input) \* numpy.ones(shape):维度右对齐；两个对应维度必须具有相同的值，或者其中一个等于1

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

shape:T2

231

<!-- page 232 of 374 -->

shape:[batch,channel,height,width]

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:int64(Tensor)

广播约束

[b,c,1,w]->[b,c,h,w],h∈[1,8192]

[b,1,1,w]->[b,c,h,w],h∈[1,8192]

[b,c,h,1]->[b,c,h,w],w ∈[1,8192]

[b,1,h,1]->[b,c,h,w],w ∈[1,8192]

[b,c,1,1]->[b,c,h,w],h∈[1,8192],w ∈[1,8192]

## 其他支持

多核联合:不支持

## GRU

门控循环单元（GRU，GatedRecurrentUnit） GRU扩展以及变体命名为exGRU算子，参数项中指明（extern）的项为exGRU独有的参数项。 计算公式如下: Equations(Default:f=Sigmoid,g=Tanh): r\_t = f(x\_t · W\_r + h\_{t−1} · R\_r + Wb\_r + Rb\_r) z\_t = f(x\_t · W\_z + h\_{t−1} · R\_z + Wb\_z + Rb\_z) h\_t = g(x\_t · W\_h + (r\_t ⊙ h\_{t−1}) · R\_h + Rb\_h + Wb\_h), (WRB=0) h\_t = g(x\_t · W\_h + r\_t ⊙ (h\_{t−1} · R\_h + Rb\_h)) + Wb\_h, (WRB=1) H\_t = (1 − z\_t) ⊙ h\_t + z\_t ⊙ h\_{t−1}

输入列表

X:T1

shape:[seq\_length,batch\_size,input\_size]

seqlength∈(0,8192]

batchsize∈(0,8192],大于1时仅支持4的倍数

inputsize∈(0,8192]

量化支持

per-layer

232

<!-- page 233 of 374 -->

## W:T1

- shape:[num\_directions,4\*hidden\_size,input\_size]
- inputsize∈(0,8192]
- hiddensize∈(0,8192]
- numdirections:1or2
- 量化支持
- per-layer
- per-channel
- R:T1
- shape:[num\_directions,4\*hidden\_size,hidden\_size]
- hiddensize∈(0,8192]
- numdirections:1or2
- 量化支持
- per-layer
- per-channel
- B:T2
- shape:[num\_directions,8\*hidden\_size]
- hiddensize∈(0,8192]
- numdirections:1or2
- 量化支持
- per-layer
- per-channel
- sequence\_lens:T3(optional)
- shape:[batch\_size]
- batchsize∈(0,8192],大于1时仅支持4的倍数
- initial\_h:T1(optional)
- shape:[num\_directions,batch\_size,hidden\_size]
- numdirections:1or2
- batchsize∈(0,8192],大于1时仅支持4的倍数
- hiddensize∈(0,8192]
- 量化支持
- per-layer

## 输出列表

233

<!-- page 234 of 374 -->

## Y:T1

shape:[seq\_length,num\_directions,batch\_size,hidden\_size]

seqlength∈(0,8192]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

Y\_h:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

## 属性列表

linear\_before\_reset:int

LBR变种的选择:1(T)or0(F)

direction(extern):string

指定GRU的运算方向

forward:指定GRU的运算方向为前向

reverse:指定GRU的运算方向为反向

bidirectional:指定GRU的运算方向为双向

sequence\_size(extern):int

指定GRU输入的seqsize，无限制，建议4对齐

hidden\_size(extern):int

GRU单元中的hiddensize，无限制，建议8对齐

input\_layout(extern):int

指定与对应输入shape含义一致的layout

要求填写指定的layout，同时要求填写该op实际对应的batch\_size、sequence\_size、hidden\_size。

snc:指定layout对应的输入shape为[seqs,batches,input\_size]

(sn)c:指定layout对应的输入shape为[seqs\*batches,input\_size,1,1]

output\_layout(extern):int

234

<!-- page 235 of 374 -->

指定与对应输出shape含义一致的layout

要求填写指定的layout，同时要求填写该op实际对应的batch\_size、sequence\_size、hidden\_size、directions。

sbnc:指定layout对应的输出shape为[seqs,directions,batches,hidden\_size]

(sn)c:指定layout对应的输出shape为[seqsbatches,directionsinput\_size,1,1]

## 数据类型约束

T1:float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## 其他支持

多核联合:暂不支持

## Gather

根据索引Indices获取输入X的指定axis维度的条目，并将它们拼接在一起。

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持

per-layer

Indices:T2

要收集的元素的索引，秩rank =1

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:int(Tensor)

属性列表

axis:int(Tensor)

235

<!-- page 236 of 374 -->

axis∈{0,1,2,3}

指定Indices获取输入的维度

其他支持

多核联合:尚不支持

## Hardmax

该OP计算给定输入的hardmax激活函数，实现参照[onnx中的Hardmax-13](https://onnx.ai/onnx/operators/onnx__Hardmax.html)

$$
\text {Hardmax} (i n p u t, a x i s) = \left\{ \begin{array}{l l} 1 & \text {if} i = \arg \max (i n p u t, a x i s) \\ 0 & \text {otherwise} \end{array} \right.
$$

输入列表

input:T

```txt
- shape:[batch,channel,height,width]
```

axis=1时,height∗width∈[1,16384);

axis=3/-1时,channel∗height∈[1,16384),且受限于transpose的规格限制

输出列表

output:T

shape:[batch,channel,height,width]

数据类型约束

T:int8(Tensor),float16(Tensor)

属性列表

axis:int

做hardmax的轴:axis∈{−1,1,3}即channel和width方向

## LSTM

长短期记忆网络（LSTM，Long Short-Term Memory） LSTM扩展以及变体命名为exLSTM算子，参数项中指明 （extern）的项为exLSTM独有的参数项。 计算公式如下:

$$
\text {Equations} (\text {Default:} f = \text {Sigmoid}, g = \text {Tanh}, h = \text {Tanh}): i _ {t} = f (x _ {t} \cdot W _ {i} + h _ {\{t - 1 \}} \cdot R _ {i} + W b _ {i} + R b _ {i}) f _ {t}
$$

输入列表

236

<!-- page 237 of 374 -->

## X:T1

shape:[seq\_length,batch\_size,input\_size]

seqlength∈(0,8192]

batchsize∈(0,8192],大于1时仅支持4的倍数

inputsize∈(0,8192]

量化支持

per-layer

W:T1

shape:[num\_directions,4\*hidden\_size,input\_size]

inputsize∈(0,8192]

hiddensize∈(0,8192]

numdirections:1or2

量化支持

per-layer

per-channel

R:T1

shape:[num\_directions,4\*hidden\_size,hidden\_size]

hiddensize∈(0,8192]

numdirections:1or2

量化支持

per-layer

per-channel

B:T2,T3

shape:[num\_directions,8\*hidden\_size]

hiddensize∈(0,8192]

numdirections:1or2

量化支持

per-layer

per-channel

sequence\_lens:T4,T5(optional)

shape:[batch\_size]

batchsize∈(0,8192],大于1时仅支持4的倍数

## initial\_h:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

237

<!-- page 238 of 374 -->

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

## 量化支持

per-layer

## initial\_c:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

## 输出列表

Y:T1

shape:[seq\_length,num\_directions,batch\_size,hidden\_size]

seqlength∈(0,8192]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

## 量化支持

per-layer

## Y\_h:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

## 量化支持

per-layer

## Y\_c:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

## 量化支持

238

<!-- page 239 of 374 -->

## per-layer

## 属性列表

direction(extern):string

指定LSTM的运算方向

forward:指定LSTM的运算方向为前向

reverse:指定LSTM的运算方向为反向

bidirectional:指定LSTM的运算方向为双向

sequence\_size(extern):int

指定LSTM输入的seqsize，无限制，建议4对齐

hidden\_size(extern):int

LSTM单元中的hiddensize，无限制，建议8对齐

proj\_size(extern):int

projection时的proj\_size，projsize∈[0,hiddensize]

目前限定0，即尚不支持projection功能

input\_forget(extern):int

cifg变种的选择:1(T)or0(F) 目 前限定0，即尚不支持

has\_projection(extern):int

projection变种:1(T)or0(F) 目 前限定0，即尚不支持

input\_layout(extern):int

指定与对应输入shape含义一致的layout

要求填写指定的layout，同时要求填写该op实际对应的batch\_size、sequence\_size、hidden\_size。

snc:指定layout对应的输入shape为[seqs,batches,input\_size]

(sn)c:指定layout对应的输入shape为[seqs\*batches,input\_size,1,1]

output\_layout(extern):int

指定与对应输出shape含义一致的layout

要求填写指定的layout，同时要求填写该op实际对应的batch\_size、sequence\_size、hidden\_size、directions。

sbnc:指定layout对应的输出shape为[seqs,directions,batches,hidden\_size]

(sn)c:指定layout对应的输出shape为[seqsbatches,directionsinput\_size,1,1]

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:int32(Tensor)

239

<!-- page 240 of 374 -->

## T4:float(Scalar)

T5:int(Scalar)

## 其他支持

## 多核联合:暂不支持

## Max

计算输入张量的元素级最大值

## 输入列表

A:T1 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

B:T1 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

## 输出列表

C:T1 shape:[batch,channel,height,width]量化支持per-layer/per-channel

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:暂不支持

240

<!-- page 241 of 374 -->

## Greater

- 计算输入张量A和B的Greater结果
- 输入列表
- • A:T1
- • shape:[batch,channel,height,width]
- • 量化支持
- • per-layer
- • 广播支持
- • 支持任意维度广播操作
- • 广播约束同Expand算子
- • B:T1
- • shape:[batch,channel,height,width]
- • 量化支持
- • per-layer
- • 广播支持
- • 支持任意维度广播操作
- • 广播约束同Expand算子
- 输出列表
- • C:T1
- • shape:[batch,channel,height,width]
- • 量化支持
- • per-layer/per-channel
- 数据类型约束
- • T1:int8(Tensor),float16(Tensor)
- 其他支持
- • 多核联合:暂不支持

## Min

计算输入张量的元素级最小值

输入列表

241

<!-- page 242 of 374 -->

## A:T1

shape:[batch,channel,height,width]

量化支持per-layer

广播支持支持任意维度广播操作广播约束同Expand算子

B:T1 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

## 输出列表

C:T1 shape:[batch,channel,height,width]量化支持per-layer/per-channel

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

## 多核联合:暂不支持

## Mul

执行元素级二进制乘法(C=A\*B),支持多向Numpy样式的广播

输入列表

A:T1,T2

shape:[batch,channel,height,width]

量化支持

per-layer

242

<!-- page 243 of 374 -->

## 广播支持

支持任意维度广播操作

广播约束同Expand算子

## B:T1,T2

shape:[batch,channel,height,width]

量化支持

per-layer

广播支持

支持任意维度广播操作

广播约束同Expand算子

## 输出列表

C:T1

shape:[batch,channel,height,width]

量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(constTensor)

## 其他支持

多核联合:RK3576支持/RV1126B不支持

## MulRelu

Mul与Relu融合计算,C=Relu(A\*B)

输入列表

同Mul

输出列表

同Mul

其他支持

多核联合:RK3576支持/RV1126B不支持

243

<!-- page 244 of 374 -->

## Pad

给定一个包含要填充的数据的张量(data),包含轴的开始和结束填充数值的张量(pads),模式(mode),常量数值(constant\_value),生成一个填充张量(output)

## 输入列表

data:T1

shape:[batch,channel,height,width]

量化支持

per-layer

pads:T2

shape : [batch\_begin, channel\_begin, height\_begin, width\_begin, batch\_end, channel\_end,height\_end,width\_end]

constant\_value(optional):T3

shape:[1]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:int64(Tensor)

T3:float(Scalar),int8(Scalar),float16(Scalar)

## 属性列表

mode:string(默认值constant)

支持模式:constant,reflect

constant无限制

reflectchannel∈(0,8192],height∈(0,8192],width∈(0,8176]

## 其他支持

多核联合:尚不支持

244

<!-- page 245 of 374 -->

## MaxPool

MaxPool消耗输入张量X并根据内核大小、步幅大小和pad长度在张量上应用最大池化。最大池化包括根据内核大小计算输入张量子集的所有值的最大值，并将数据下采样到输出张量Y中以进行进一步处理。 输出空间形状的计算方式有所不同，具体取决于是否使用显式填充（在使用pads的情况下）或使用 自 动填充（在使用auto\_pad的情况下）。仅使用显式填充

输入列表

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

height∈(0,8192]

width∈(0,8192]

输出列表

output:T1

shape:[batch,channel,height,width]

属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

kernel\_h∈(0,7]

kernel\_w∈(0,7]

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

storage\_order:int64[]

245

<!-- page 246 of 374 -->

优先储存方式:0

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## GlobalMaxPool

GlobalMaxPool使用输入张量X并对同一通道中的值应用最大池化。这相当于MaxPool的kernel\_shape 大小等于input的空间维度。

输入列表

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

height∈(0,8192]

width∈(0,8192]

输出列表

output:T1

shape:[batch,channel,height,width]

属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

kernel\_h∈(0,7]

kernel\_w∈(0,7]

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

246

<!-- page 247 of 374 -->

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## AveragePool

AveragePool使用输入张量X并根据内核大小、步幅大小和pad长度在张量上应用平均池化。平均池化包括根据内核大小计算输入张量子集的所有值的平均值，并将数据下采样到输出张量Y中以进行进一步处理。输出空间形状的计算方式有所不同，具体取决于是否使用显式填充（在使用pads的情况下）或使用 自动填充（在使用auto\_pad的情况下）。仅使用显式填充

输入列表

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

height∈(0,8192]

width∈(0,8192]

输出列表

output:T1

shape:[batch,channel,height,width]

属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

kernel\_h∈(0,7]

kernel\_w∈(0,7]

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

247

<!-- page 248 of 374 -->

strides\_w∈(0,8]

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## GlobalAveragePool

GlobalAveragePool使用输入张量X并对同一通道中的值应用平均池化。这相当于AveragePool，其kernel\_shape大小等于输入张量的空间维度。

输入列表

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

height∈(1,7]

width∈(1,7]

输出列表

output:T1

shape:[batch,channel,height,width]

属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

kernel\_h∈(0,7]

kernel\_w∈(0,7]

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

248

<!-- page 249 of 374 -->

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## Pow

Z =XY 指数运算，采用输入数据（张量）和指数，并产生一个输出数据（张量）

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持

per-layer

Y:T2

shape:[1]

当前仅支持0、1、2、3、0.5、-0.5

输出列表

Z:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

249

<!-- page 250 of 374 -->

T1:int8(Tensor),float16(Tensor)

T2:int8(Tensor),int32(Tensor),int64(Tensor),float16(Tensor),float(Tensor)

## 其他支持

多核联合:尚不支持

## ReduceMax

获取输入张量channel方向上的最大值

输入列表

input:T1 shape:[batch,channel,height,width]量化支持per-layer广播支持无

输出列表

output:T1 shape:[batch,1,height,width]量化支持per-layer

数据类型约束

T1:float16(Tensor)

## 其他支持

多核联合:暂不支持

## Relu

将输入张量的负值设为零，正值保持不变

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

250

<!-- page 251 of 374 -->

## per-layer

广播支持

## 无

## 输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:暂不支持

## Clip/ReLU6

将输入张量的值裁剪到[0,6]范围内

输入列表

input:T1 shape:[batch,channel,height,width]量化支持per-layer广播支持无

输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

251

<!-- page 252 of 374 -->

## 其他支持

多核联合:暂不支持

## PRelu

将输入张量的负值按可学习参数缩放，正值保持不变

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持per-layer/per-channel

广播支持无

输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer/per-channel

属性列表

slope:PRelu系数仅支持单个标量或C维度系数

数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:暂不支持

## LeakyRelu

将输入张量的负值按固定比例缩放，正值保持不变

输入列表

input:T1

shape:[batch,channel,height,width]

252

<!-- page 253 of 374 -->

量化支持per-layer广播支持无

## 输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:暂不支持

## Reshape

在不改变输入数据和元素数量的情况下，返回一个具有指定形状的张量。

输入列表

input:T1 shape:[batch,channel,height,width]量化支持per-layer

输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

属性列表

253

<!-- page 254 of 374 -->

shape:int指定输出张量的形状

其他支持

多核联合:尚不支持

## Resize

调整输入张量的大小。一般来说，它将输出张量中的每个值计算为输入张量中邻域（即采样位置）的加权平均值

输入列表

X:T1 shape:[batch,channel,height,width]量化支持per-layer

roi(optional):T2目前暂不支持

scales(optional):T2沿每个维度的缩放比例数组

sizes(optional):T3输出张量的目标大小

输出列表

Y:T1 shape:[batch,channel,height,width]量化支持per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:int64(Tensor)

属性列表

antialias:int（默认值为0）目前不支持设置

254

<!-- page 255 of 374 -->

axes:int[]

目前不支持设置

coordinate\_transformation\_mode:strings（默认值为”half\_pixel”）目 前仅支持half\_pixel，pytorch\_half\_pixel，align\_corners三种

cubic\_coeff\_a:float（默认为-0.75）

目前不支持设置

exclude\_outside:int（默认值为0）目前不支持设置

extrapolation\_value:float（默认为0）

目前不支持设置

keep\_aspect\_ratio\_policy:strings（默认值为”stretch”）

目前不支持设置

mode:strings（默认值为”nearest”）

目 前仅支持nearest和linear两种可配置

nearest\_mode:strings（默认值为”round\_prefer\_floor”）

目前不支持设置支持说明 目前仅支持宽高方向的整数倍缩放,且缩放倍数为2-8的整数倍,如果是(1,c,1,1)则支持放大到(1,c,h, w)

多核联合:不支持

## Slice

获得当前向量的一个切片，具体规则和[numpy切片](https://numpy.org/doc/stable/user/basics.indexing.html)相同

输入列表

input\_tensor:T

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

255

<!-- page 256 of 374 -->

```erlang
- T:int8(Tensor),float16(Tensor)
```

```txt
属性列表
• starts:int(Tensor)
    - 切分的起始位置:无限制
• ends:int(Tensor)
    - 切分的终止位置:无限制
• axes:int(Tensor)
    - 选取切分的轴:支持任意0~3轴,支持同时多轴选择
• steps:int(Tensor)
    - 选取切分对应轴的步长
    - 当height*width==1&&channel%subc==0&&starts[1]%subc==0&&ends[1]%subc==0&&steps[1]<=subc时,steps可以不为1,否则只有steps==[1,1,1,1]时,才可通过NPU运行SliceOP
```

## Softmax

该运算符计算给定输入的归一化指数值:

```txt
Softmax(input, axis) = exp(input - max(input, axis)) / Σ_axis exp(input - max(input, axis))
```

“axis”属性表示Softmax执行的维度。输出张量具有相同的形状并包含相应输入的Softmax值。

输入列表

```txt
- input:T1
    - shape:[batch,channel,height,width]
    - 受限于transpose的规格限制
```

输出列表

```txt
- output:T1
    - shape:[batch,channel,height,width]
```

数据类型约束

```txt
- T1:int8(Tensor),float16(Tensor)
```

属性列表

```txt
- axis:int64
```

做softmax的轴:1,3，即channel和width方向

256

<!-- page 257 of 374 -->

## 其他支持

多核联合:尚不支持

## exSoftmax13

该运算符计算给定输入的归一化指数值:

```julia
exSoftmax13(input, axis) = exp(input - max(input, axis)) / Σ_axis exp(input - max(input, axis))
```

“axis”属性表示Softmax执行的维度。输出张量具有相同的形状并包含相应输入的Softmax值。

输入列表

input:T1

受限于transpose的规格限制

输出列表

```yaml
- output:T1
  - shape:[batch,channel,height,width]
```

数据类型约束

```txt
- T1:int8(Tensor),float16(Tensor)
```

属性列表

axis:int64

其他支持

多核联合:尚不支持

## exSoftmaxMask

该运算符计算给定输入的归一化指数值:

$$
\begin{array}{c} \text {input} (x, m a s k _ {-} t, m a s k _ {-} v a l u e) = \left\{ \begin{array}{l l} x + (m a s k _ {t} - 1) * i n f & \text {if mask\_value = 0} \\ x + m a s k _ {t} * (- i n f) & \text {elif mask\_value = 1} \end{array} \right. \\ \text {exSoftmaxMask(input, axis)} = \frac {\exp (i n p u t - \max (i n p u t , a x i s))}{\sum_ {a x i s} \exp (i n p u t - \max (i n p u t , a x i s))} \end{array}
$$

257

<!-- page 258 of 374 -->

"axis"属性表示Softmax执行的维度。输出张量具有相同的形状并包含相应输入的Softmax值。

## 输入列表

input:T1

shape:[batch,channel,height,width]

受限于transpose的规格限制

mask(optional):T1

shape:[1,channel,height,width]

channel∈(0,8192]

width: · axis=1,无限制; · axis=3/-1,width∈(0,8192]

输出列表

output:T1

shape:[batch,channel,height,width]

数据类型约束

T1:int8(Tensor),float16(Tensor)

属性列表

axis:int64

做softmax的轴:1,3，即channel和width方向

mask\_value:int64

需要mask的值:0,1

其他支持

多核联合:尚不支持

## Split

将向量沿着axis方向分成num\_outputs个向量，split用于指定切分后向量在axis方向上的大小

输入列表

input\_tensor:T

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

258

<!-- page 259 of 374 -->

## output:T

一或多个输出向量，由num\_outputs属性决定

shape:根据切分情况决定

量化支持

per-layer

## 数据类型约束

T:int8(Tensor),float16(Tensor)

属性列表

axis:int axis∈{0,1,2,3}

num\_outputs:int

split:int(Tensor)

## Sub

执行元素级二进制减法(C=A-B),支持多向Numpy样式的广播

输入列表

A:T1,T2

shape:[batch,channel,height,width]

量化支持per-layer

广播支持[b,c,1,1] [scalar]

B:T1,T2

shape:[batch,channel,height,width]

量化支持per-layer

广播支持[b,c,1,1] [scalar]

## 输出列表

259

<!-- page 260 of 374 -->

C:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(constTensor)

## 其他支持

多核联合:不支持

## Tile

通过平铺给定的张量构造张量,这与Numpy中的函数tile相同，但没有广播

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持per-layer

repeats:T2

shape:[batch,channel,height,width]

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:int64(Tensor)

## 其他支持

多核联合:不支持

260

<!-- page 261 of 374 -->

## Transpose

对输入张量进行转置输入列表X:T1 shape:[n1,c1,h1,w1]详细约束规则见属性列表量化支持per-layer

输出列表

Y:T1,T2 shape:[n2,c2,h2,w2]详细约束规则见属性列表量化支持per-layer

属性列表

perm转置的轴顺序: 不同perm参数限制如下:(其中p=268435456,q=65536) perm=[0,1,2,3]无限制perm=[0,1,3,2] T1:h1%16=0,h1**w1<16**p,h1**w1<2**q T2:h1%8=0,h1**w1<8**p,h1**w1<2**q perm=[0,2,3,1] T1:c1<8192,h1**w1%8=0**， **w1**c1<p\*16 T2:c1<8192,h1**w1%8=0**， **w1**c1<p\*8 perm=[0,2,1,3] T1:h1%16=0,h1**w1<16**p,h1**w1<2**q,c1\*w1<p T2:h1%8=0,h1**w1<8**p,h1**w1<2**q,c1\*w1<p perm=[0,3,1,2] T1,T2:h1**w1<p,w1<8192,h1**c1<p perm=[0,3,2,1] T1:h1%16=0,h1**w1<16**p,h1**w1<2**q,c1<p\*16 T2:h1%8=0,h1**w1<8**p,h1**w1<2**q,c1<p\*8

261

<!-- page 262 of 374 -->

perm=[1,0,2,3] T1:h1**w1<16**p,n1<8192,h1\*w1<p T2:h1**w1<8**p,n1<8192,h1\*w1<p perm=[1,0,3,2] T1:h1%16=0,c1**h1**w1<16**p,h1**w1<2\*q T2:h1%8=0,c1**h1**w1<8**p,h1**w1<2\*q perm=[1,2,0,3] T1:n1**w1<p**16,c1**h1**w1<p,w1%16=0 T2:n1**w1<p**8,c1**h1**w1p,w1%8=0 perm=[1,2,3,0] T1:h1**w1<p,n1<p**16,c1**h1**w1<p**16,n1**w1<p\*16 T2:h1**w1<p,n1<p**8,c1**h1**w1<p**8,n1**w1<p\*8 perm=[1,3,0,2] T1:c1**w1<8192,n1**h1<p,w1%16=0 T2:c1**w1<8192,n1**h1<p,w1%8=0 perm=[1,3,2,0] T1:c1**h1**w1<p,n1\*h1<p,w1<8192,w1%16=0 T2:c1**h1**w1<p,n1\*h1<p,w1<8192,w1%8=0 perm=[2,1,0,3] T1,T2:c1<8192,c1**h1**w1<p,n1\*w1<p perm=[2,1,3,0] T1:c1**h1**w1<p,n1**w1<p**16,c1<8192,n1\*w1%4=0 T2:c1**h1**w1<p,n1**w1<p**8,c1<8192,n1\*w1%4=0 perm=[2,0,3,1] T1,T2:c1<8192,c1**h1**w1<p perm=[2,0,1,3] T1:n1**c1**h1**w1<p,h1**w1%16=0 T2:n1**c1**h1**w1<p,h1**w1%8=0 perm=[2,3,1,0] T1:c1**h1**w1<p,n1**c1<p,h1**w1<8192,h1\*w1%16=0 T2:c1**h1**w1<p,n1**c1<p,h1**w1<8192,h1\*w1%8=0 perm=[2,3,0,1] T1,T2:h1**w1<8192,n1**c1<p perm=[3,0,2,1] T1:h1**w1<p,n1**c1<8192,c1**h1<p,n1**w1<8192,n1\*w1%16=0

262

<!-- page 263 of 374 -->

```csv
- T2:h1w1<p,n1c1<8192,c1h1<p,n1w1<8192,n1*w1%8=0
```

perm=[3,0,1,2]

```csv
- T1:h1w1<p,n1c1<8192,c1h1<p,n1w1<8192,n1h1w1%16=0
```

```txt
• perm=[3,2,0,1]
```

```txt
- T1,T2:h1w1<p,n1c1<8192,n1c1w1<p
```

perm=[3,2,1,0]

```csv
- T1:c1h1w1<p,h1w1<8192,2h1w1<q,n1c1<p*16,h1%16=0
```

```txt
• perm=[3,1,0,2]
```

```csv
• T1,T2:h1w1<p,c1w1<8192,n1*h1<p
```

```txt
• perm=[3,1,2,0]
```

```csv
- T1,T2:h1w1<p,n1c1<8192,n1h1<p,n1c1*w1<p
```

## 数据类型约束

T1:int8(Tensor)

```autohotkey
- T2:int16(Tensor),float16(Tensor)
```

其他支持

多核联合:暂不支持

## Sigmoid

给定输入张量，函数y=1/(1+exp(-x))按元素应用于输入张量，得到输出张量

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

263

<!-- page 264 of 374 -->

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:尚不支持

## Tanh

计算给定输入张量单元的双曲正切

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1 shape:[batch,channel,height,width]量化支持:per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:尚不支持

## Softplus

按元素应用Softplus函数,y=ln(exp(x)+1)

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

264

<!-- page 265 of 374 -->

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:尚不支持

## HardSigmoid

给定输入张量，函数y=max(0,min(1,alpha\*x+beta))按元素应用于输入张量，得到输出张量，这里alpha=1/6，beta= 0.5

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:尚不支持

## HardSwish

按元素应用 HardSwish 函数, y = x \* max(0, min(1, alpha \* x + beta)) = x \* HardSigmoid(x),这里alpha=1/6, beta=0.5

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

265

<!-- page 266 of 374 -->

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:尚不支持

## Elu

给定输入张量，函数f(x)=alpha\*(exp(x)-1.)forx<0,f(x)=xforx>=0 按元素应用于输入张量，得到输出张量，这里alpha=1

输入列表

input:T1 shape:[batch,channel,height,width]量化支持per-layer

输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:尚不支持

## exSwish

按元素应用Sigmoid线性单元函数,Swish函数也称为SiLU函数,y=x\*sigmoid(x)

输入列表

266

<!-- page 267 of 374 -->

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:尚不支持

## exMish

给定输入张量，函数mish(x)=x**tanh(softplus(x))=x**tanh(ln(1+e^{x}))按元素应用于输入张量，得到输出张量

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

其他支持

多核联合:尚不支持

267

<!-- page 268 of 374 -->

## exGelu

给定输入张量，函数y =x∗Φ(x)按元素应用于输入张量，得到输出张量，当Φ(x)函数设置成tanh时，

$$
y = 0. 5 * x * (1 + \operatorname{Tanh} (\sqrt {\frac {2}{\pi}} * (x + 0. 0 4 4 7 1 5 * x ^ {3})))
$$

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

## 其他支持

多核联合:尚不支持

## Sin

计算给定输入张量单元的Sin

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

数据类型约束

268

<!-- page 269 of 374 -->

T1:float16(Tensor)

## 其他支持

多核联合:尚不支持

## Cos

计算给定输入张量单元的Cos

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

数据类型约束

T1:float16(Tensor)

其他支持

多核联合:尚不支持

## Where

根据mask\_tensor获取x\_tensor或y\_tensor的值，当mask\_tensor位置为True时，取x\_tensor对应位置的值，否则取y\_tensor的值。

输入列表

mask\_tensor:T1

shape:[batch,channel,height,width]

广播支持

支持任意维度广播操作

广播约束

广播约束同Expand算子

x\_tensor:T2

shape:[batch,channel,height,width]

269

<!-- page 270 of 374 -->

## 量化支持

per-layer

广播支持支持任意维度广播操作

广播约束

广播约束同Expand算子

y\_tensor:T2

shape:[batch,channel,height,width]

量化支持

per-layer

广播支持

支持任意维度广播操作

广播约束

广播约束同Expand算子

输出列表

output:T2 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

T1:bool(Tensor)

T2:int8(Tensor),float16(Tensor)

## exConvStreaming

为了减少语音模型的时延，把原始卷积的输入分成若干个时间帧片，将每个时间帧片作为输入，计算卷积，最后将计算结果缓存起来供后续时间帧使用，从而达到音频流式处理的目的。

输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

width: 目 前支持width=1。

量化支持

per-layer

270

<!-- page 271 of 374 -->

## weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,31]

kernel\_w∈[1,31]

量化支持

per-layer

per-channel

## 输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 属性列表

strides:int(strides\_h,strides\_w)

stride\_h∈[1,7]

stride\_w∈[1,7]

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right)

pads\_top∈[0,15]

pads\_left∈[0,15]

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,32]

dilations\_w∈[1,32]

## 数据类型约束

T1:float16(Tensor)

其他支持

多核联合:尚不支持

## exConvStreamingPRelu/LeakyRelu

271

<!-- page 272 of 374 -->

exConvStreaming 与 PRelu/LeakyRelu 融合计算, Output = PRelu(exConvStreaming(Input)) 或者Output= LeakyRelu(exConvStreaming(Input)) 说明及规格限制同exConvStreaming

## exGlu

门控线性单元(GatedLinearUnit)函数,其中a是输入矩阵的前一半,b是后一半 GLU(a,b)=a⊗σ(b)输入列表

Input:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Output:T1

shape:[batch,channel/2,height,width]

量化支持:per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

属性列表

axis:int(默认值=1)

分割输入的维度

约束:仅支持1

其他支持

多核联合:尚不支持

## exMatMul

矩阵乘法操作

$$
Y = \left\{ \begin{array}{l l} A \cdot B + C & \text {if c\_type = "add"} \\ A \cdot B * C & \text {if c\_type = "mul"} \end{array} \right.
$$

输入列表

A:T1

shape:[b,k,1,n]

k ∈(0,8192]

272

<!-- page 273 of 374 -->

## 量化支持

per-layer

B:T1 shape:[b,k,1,m]量化支持per-layer

C(optional):T1,T2 shape:[b,n,1,m]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

输出列表

Y:T1 shape:[b,n,1,m]量化支持per-layer

数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

属性列表

c\_type:strings(默认值“add”)支持add和mul可选,表示C是做加法还是乘法

其他支持

多核联合:不支持

## exNorm

对输入数据进行各种归一化操作，目 前支持LayerNormalization、RMSNormalization和MeanVarianceNormalization三种:

273

<!-- page 274 of 374 -->

$$
\text {LayerNorm} (x) = \frac {x - \mu}{\sqrt {\sigma^ {2} + \epsilon}} \cdot W + B
$$

$$
\text {RMSNorm} (x) = \frac {x}{\sqrt {\mathrm{RMS} ^ {2} + \epsilon}} \cdot W + B
$$

$$
\text {MeanVarianceNorm} (x) = \frac {x - \mu}{\sqrt {\text {Variance} + \epsilon}} \cdot W + B
$$

其中: x是输入向量。 µ和σ²分别是输入向量的均值和方差:

$$
\mu = \frac{1}{H}\sum_{i = 1}^{H}x_{i}
$$

$$
\sigma^2 = \frac{1}{H}\sum_{i = 1}^{H}(x_i - \mu)^2
$$

RMS是输入向量均方根:

$$
\text {RMS} = \sqrt {\frac {1}{H} \sum_ {i = 1} ^ {H} x _ {i} ^ {2}}
$$

Variance是输入向量的等效方差:

$$
\text {Variance} = \frac {1}{H} \sum_ {i = 1} ^ {H} x _ {i} ^ {2} - \mu^ {2}
$$

ϵ是一个很小的数，用于防止除零操作。 W 和B是可选择的参数。

输入列表

X:T1

shape:[batch,channel,height,width]

W(optional):T1

shape:[batch,channel,height,width]

B(optional):T1

shape:[batch,channel,height,width]

输出列表

Y:T1

274

<!-- page 275 of 374 -->

shape:[batch,channel,height,width]

## 数据类型约束

T1:float16(Tensor)

属性列表

epsilon:float(默认值1e-05)

用来防止除0的epsilon数值

mode:string

支持layer、rms和mean\_var三种Normalization模式可选

axes:int64[](默认值[1])

归一化轴，目前只支持[1]和[1,2,3]

## 其他支持

多核联合:尚不支持

## exSDPAttention

计算查询(query)、键(key)和值(value)之间的缩放点积注意力(SDPA)

输入列表

query:T1 shape:[batch,channel,height,width] channel∈(0,8192]量化支持per-layer

key:T1 shape:[batch,channel,height,width]量化支持per-layer

value:T1 shape:[batch,channel,height,width] channel∈(0,8192]量化支持per-layer

mask(optional):T1,T2

275

<!-- page 276 of 374 -->

shape:[batch,channel,height,width]

量化支持

per-layer

广播支持

默认支持任意维度广播操作

开启FA支持后,只支持[b,c,1,1],[1,c,1,1]和[1,c,h,w]三种规格

scale(optional):T3

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## 其他支持

多核联合:RK3576支持/RV1126B不支持

FlashAttentionV2(FA):支持

基于[https://arxiv.org/abs/2307.08691](https://arxiv.org/abs/2307.08691)实现,通过高速缓存内循环实现加速以及减少宽带使用，但是会导致模型增大，请根据具体场景和模型选择是否开启使用

RKNPU驱动版本>=0.9.7

RKNPURuntime库(librknnrt.so)版本>=2.1.0

支持数据类型:float16

## exWindow

exWindow来源于[swin\_transformer](https://github.com/microsoft/Swin-Transformer/blob/main/models/swin_transformer.py)的window\_partition和window\_reverse操作。 原论文中输入特征被划分为多个不重叠的窗口，每个窗口的大小为window\_size× window\_size。要求输入和输出特征都为4维shape，在高和宽方向上都进行划分。 pytorch实现的计算方法如下:

276

<!-- page 277 of 374 -->

```python
def window_partition(x, window_size):
    """
    Args:
        x: (B, C, H, W)
        window_size (int): window size
    Returns:
        windows: (B, C, num_windows * num_windows, window_size * window_size)
    """
    B, C, H, W = x.shape
    x = x.view(B, C, H // window_size, window_size, W // window_size, window_size)
    windows = x.permute(0, 1, 2, 4, 3, 5).contiguous().view(B, C, -1, window_size * window_size)
    return windows

def window_reverse(windows, window_size, H, W):
    """
    Args:
        windows: (B, C, num_windows * num_windows, window_size * window_size)
        window_size (int): Window size
        H (int): Height of image
        W (int): Width of image
    Returns:
        x: (B, C, H, W)
    """
    B, C, _, _ = windows.shape
    x = windows.view(B, C, H // window_size, W // window_size, window_size, window_size)
    x = x.permute(0, 1, 2, 4, 3, 5).contiguous().view(B, C, H, W)
    return x
```

```txt
输入列表
• X:T1
    • shape:[batch,channel,height,width]

输出列表
• Y:T1
    • shape:[batch,channel,height,width]

数据类型约束
• T1:int8(Tensor),float16(Tensor)

属性列表
• mode:string
    • 支持模式:partition,reverse,partition_num_first
        • partition:参考window_partition实现;
        • reverse:参考window_reverse实现;
        • partition_num_first: 与 partition 的区别在于，partition_num_first 的 H,W 按照 num_windows进行划分，而partition的H,W按照window_sizes进行划分。
```

277

<!-- page 278 of 374 -->

window\_sizes:listofints

2维向量,窗口的大小。定义了每个窗口的高度和宽度。窗口内的注意力计算和特征提取都是基于这个大小。

num\_windows:listofints

2维向量,窗口的数量。定义了输入特征的高度和宽度被划分为多少个窗口。

## 其他支持

多核联合:尚不支持

## RK2118

## Add

执行元素级二进制加法(C=A+B),支持多向Numpy样式的广播

输入列表

A:T1,T2 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

B:T1,T2 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

输出列表

C:T1 shape:[batch,channel,height,width]量化支持per-layer

278

<!-- page 279 of 374 -->

## 数据类型约束

T1:float16(Tensor)

T2:float(constTensor)

## AddRelu

Add与Relu融合计算,C=Relu(A+B)

输入列表

同Add

输出列表

同Add

## BatchNormalization

按照论文[https://arxiv.org/abs/1502.03167](https://arxiv.org/abs/1502.03167)中的描述对输入张量进行批量归一化计算

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:float16(Tensor)

属性列表

epsilon:float（默认值=1e-5）

除以标准差时加上防止除0的实数

epsilon∈(0,∞]

momentum:float

279

<!-- page 280 of 374 -->

训练时的滑动平均参数

## Concat

将一系列向量在axis指定的方向上组合成一个向量，所有向量除axis指定的方向外大小必须相同输入列表

input\_tensor:T shape:[batch,channel,height,width]量化支持per-layer

输出列表

output:T shape:[batch,channel,height,width]量化支持per-layer

数据类型约束

T:float16(Tensor)

属性列表

axisint64 axis∈{0,1,2,3}

## Convolution

卷积

输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

width: 当dilated\_kernel\_h>1时,width<16383。此外,对首层输入width存在限制，详见模型输入说明。

量化支持

per-layer

weight:T1

280

<!-- page 281 of 374 -->

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,31]

kernel\_w∈[1,31]

量化支持

per-layer

per-channel

## 输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 属性列表

strides:int(strides\_h,strides\_w)

stride\_h∈[1,7]

stride\_w∈[1,7]

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right)

pads\_top∈[0,15]

pads\_left∈[0,15]

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,31]

dilations\_w∈[1,31]

## 数据类型约束

T1:float16(Tensor)

## Depthwise Convolution

深度可分离卷积

输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

281

<!-- page 282 of 374 -->

width: 当dilated\_kernel\_h>1时,width<16383。此外,对首层输入width存在限制，详见模型输入说明。

## 量化支持

per-layer

## weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,8]

kernel\_w∈[1,8]

量化支持

per-layer

per-channel

## 输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 属性列表

strides:int(strides\_h,strides\_w)

stride\_h∈[1,7]

stride\_w∈[1,7]

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right)

pads\_top∈[0,15]

pads\_left∈[0,15]

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,32]

dilations\_w∈[1,32]

## 数据类型约束

T1:float16(Tensor)

282

<!-- page 283 of 374 -->

## ConvolutionRelu

Convolution与Relu融合计算,Output=Relu(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionClip

Convolution与Clip融合计算,Output=Clip(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionPRelu/LeakyRelu

Convolution 与 PRelu/LeakyRelu 融合计算, Output = PRelu(Conv(Input)) 或者 Output =

LeakyRelu(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionAdd

Convolution与Add融合计算, $\mathsf { I O u t p u t { = } A d d ( C o n v ( I n p u t 0 ) , I n p u t 1 ) }$ 说明及规格限制同Convolution

## ConvolutionSigmoid

Convolution与Sigmoid融合计算,Output=Sigmoid(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionTanh

Convolution与Tanh融合计算, $\mathsf { . O u t p u t { = } T a n h ( C o n v ( I n p u t ) ) }$ 说明及规格限制同Convolution

## ConvolutionSoftplus

Convolution与Softplus融合计算,Output=Softplus(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionHardSigmoid

Convolution与HardSigmoid融合计算, $, \mathsf { O u t p u t } { = } \mathsf { H a r d S i g m o i d } ( \mathsf { C o n v } ( \mathsf { I n p u t } ) )$ 说明及规格限制同

Convolution

## ConvolutionHardSwish

Convolution与HardSwish融合计算, $\mathsf { { . O u t p u t } { = } { H a r d S w i s h } ( { C o n v } ( { I n p u t } ) ) }$ 说明及规格限制同Convolution

## ConvolutionElu

283

<!-- page 284 of 374 -->

Convolution与Elu融合计算,Output=Elu(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionSwish

Convolution与Swish融合计算,Output=Swish(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionMish

Convolution与Mish融合计算,Output=Mish(Conv(Input)) 说明及规格限制同Convolution

## ConvTranspose

转置卷积

输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

width: 当dilated\_kernel\_h>1时,width<16383。此外,对首层输入width存在限制，详见模型输入说明。

量化支持

per-layer

weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,31]

kernel\_w∈[1,31]

量化支持

per-layer

per-channel

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

属性列表

strides:int(strides\_h,strides\_w)

284

<!-- page 285 of 374 -->

stride\_h∈[1,8]

stride\_w∈[1,8]

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right) 设置pad时注意: 不支持kernel\_h**dilations\_h-dilations\_h-pads\_top<0** 不支持**kernel\_w**dilations\_w-dilations\_wpads\_left<0 不支持stride\_h**(height-1)-pads\_top+1<output\_h** 不支持**stride\_w**(width-1)- pads\_left+1<output\_w

pads\_top∈[0,15]

pads\_left∈[0,15]

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

group:仅支持1,当且仅当num\_input=num\_output时支持num\_output

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,32]

dilations\_w∈[1,32]

当dilation不等于(1,1)时，只支持kernel=(1,1)

## 数据类型约束

T1:float16(Tensor)

## Div

执行元素级二进制除法(C=A/B),支持多向Numpy样式的广播

输入列表

A:T1,T2

shape:[batch,channel,height,width]

量化支持

per-layer

广播支持[b,c,1,1] [scalar]

B:T1,T2

shape:[batch,channel,height,width]

量化支持

per-layer

广播支持

285

<!-- page 286 of 374 -->

[b,c,1,1]

[scalar]

## 输出列表

C:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:float16(Tensor)

T2:float(constTensor)

## Expand

根据给定的 shape 和广播规则广播输入张量。广播规则类似于 numpy.array(input) \* numpy.ones(shape):维度右对齐；两个对应维度必须具有相同的值，或者其中一个等于1

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

shape:T2

shape:[batch,channel,height,width]

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:float16(Tensor)

T2:int64(Tensor)

广播约束

286

<!-- page 287 of 374 -->

[b,c,1,w]->[b,c,h,w],h∈[1,8192]

[b,1,1,w]->[b,c,h,w],h∈[1,8192]

[b,c,h,1]->[b,c,h,w],w ∈[1,8192]

[b,1,h,1]->[b,c,h,w],w ∈[1,8192]

[b,c,1,1]->[b,c,h,w],h∈[1,8192],w ∈[1,8192]

## LSTM

长短期记忆网络（LSTM，Long Short-Term Memory） LSTM扩展以及变体命名为exLSTM算子，参数项中指明 （extern）的项为exLSTM独有的参数项。 计算公式如下:

Equations(Default:f=Sigmoid,g=Tanh,h=Tanh): i\_t = f(x\_t · W\_i + h\_{t−1} · R\_i + Wb\_i + Rb\_i) f\_t = f(x\_t · W\_f + h\_{t−1} · R\_f + Wb\_f + Rb\_f) c\_t = f(x\_t · W\_c + h\_{t−1} · R\_c + Wb\_c + Rb\_c) o\_t = f(x\_t · W\_o + h\_{t−1} · R\_o + Wb\_o + Rb\_o) C\_t = f\_t ⊙ C\_{t−1} + i\_t ⊙ c\_t h\_t = o\_t ⊙ h(C\_t)

输入列表

X:T1

shape:[seq\_length,batch\_size,input\_size]

seqlength∈(0,8192]

batchsize∈(0,8192],大于1时仅支持4的倍数

inputsize∈(0,8192]

量化支持

per-layer

W:T1

shape:[num\_directions,4\*hidden\_size,input\_size]

inputsize∈(0,8192]

hiddensize∈(0,8192]

numdirections:1or2

量化支持

per-layer

per-channel

R:T1

shape:[num\_directions,4\*hidden\_size,hidden\_size]

hiddensize∈(0,8192]

numdirections:1or2

量化支持

per-layer

287

<!-- page 288 of 374 -->

## per-channel

## B:T2

shape:[num\_directions,8\*hidden\_size]

hiddensize∈(0,8192]

numdirections:1or2

量化支持

per-layer

per-channel

sequence\_lens:T3(optional)

shape:[batch\_size]

batchsize∈(0,8192],大于1时仅支持4的倍数

initial\_h:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

initial\_c:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

## 输出列表

## Y:T1

shape:[seq\_length,num\_directions,batch\_size,hidden\_size]

seqlength∈(0,8192]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

## 量化支持

288

<!-- page 289 of 374 -->

## per-layer

Y\_h:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

Y\_c:T1(optional)

shape:[num\_directions,batch\_size,hidden\_size]

numdirections:1or2

batchsize∈(0,8192],大于1时仅支持4的倍数

hiddensize∈(0,8192]

量化支持

per-layer

## 属性列表

direction(extern):string

指定LSTM的运算方向

forward:指定LSTM的运算方向为前向

reverse:指定LSTM的运算方向为反向

bidirectional:指定LSTM的运算方向为双向

sequence\_size(extern):int

指定LSTM输入的seqsize，无限制，建议4对齐

hidden\_size(extern):int

LSTM单元中的hiddensize，无限制，建议8对齐

proj\_size(extern):int

projection时的proj\_size，projsize∈[0,hiddensize]

目前限定0，即尚不支持projection功能

input\_forget(extern):int

cifg变种的选择:1(T)or0(F) 目 前限定0，即尚不支持

has\_projection(extern):int

projection变种:1(T)or0(F) 目 前限定0，即尚不支持

input\_layout(extern):int

指定与对应输入shape含义一致的layout

289

<!-- page 290 of 374 -->

要求填写指定的layout，同时要求填写该op实际对应的batch\_size、sequence\_size、hidden\_size。

snc:指定layout对应的输入shape为[seqs,batches,input\_size]

(sn)c:指定layout对应的输入shape为[seqs\*batches,input\_size,1,1]

output\_layout(extern):int

指定与对应输出shape含义一致的layout

要求填写指定的layout，同时要求填写该op实际对应的batch\_size、sequence\_size、hidden\_size、directions。

sbnc:指定layout对应的输出shape为[seqs,directions,batches,hidden\_size]

(sn)c:指定layout对应的输出shape为[seqsbatches,directionsinput\_size,1,1]

## 数据类型约束

T1:float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## 其他支持

多核联合:暂不支持

## Max

计算输入张量的元素级最大值

输入列表

A:T1

shape:[batch,channel,height,width]

量化支持per-layer

广播支持

支持任意维度广播操作

广播约束同Expand算子

B:T1

shape:[batch,channel,height,width]

量化支持per-layer

广播支持

支持任意维度广播操作

广播约束同Expand算子

290

<!-- page 291 of 374 -->

## 输出列表

C:T1 shape:[batch,channel,height,width]量化支持per-layer/per-channel

数据类型约束

T1:float16(Tensor)

其他支持

多核联合:暂不支持

## Mul

执行元素级二进制乘法(C=A\*B),支持多向Numpy样式的广播

输入列表

A:T1,T2

shape:[batch,channel,height,width]

量化支持per-layer

广播支持支持任意维度广播操作广播约束同Expand算子

B:T1,T2

shape:[batch,channel,height,width]

量化支持per-layer

广播支持支持任意维度广播操作广播约束同Expand算子

输出列表

C:T1

shape:[batch,channel,height,width]

量化支持

291

<!-- page 292 of 374 -->

per-layer

## 数据类型约束

T1:float16(Tensor)

T2:float(constTensor)

## MulRelu

Mul与Relu融合计算,C=Relu(A\*B)

输入列表

同Mul

输出列表

同Mul

其他支持

多核联合:支持

## Pad

给定一个包含要填充的数据的张量(data),包含轴的开始和结束填充数值的张量(pads),模式(mode),常量数值(constant\_value),生成一个填充张量(output)

输入列表

data:T1

shape:[batch,channel,height,width]

量化支持

per-layer

pads:T2

shape : [batch\_begin, channel\_begin, height\_begin, width\_begin, batch\_end, channel\_end,height\_end,width\_end]

constant\_value(optional):T3 shape:[1]量化支持per-layer

输出列表

output:T1

292

<!-- page 293 of 374 -->

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:float16(Tensor)

T2:int64(Tensor)

T3:float(Scalar),int8(Scalar),float16(Scalar)

属性列表

mode:string(默认值constant)

支持模式:constant,reflect

constant无限制

reflectchannel∈(0,8192],height∈(0,8192],width∈(0,8176]

其他支持

多核联合:尚不支持

## MaxPool

MaxPool消耗输入张量X并根据内核大小、步幅大小和pad 长度在张量上应用最大池化。最大池化包括根据内核大小计算输入张量子集的所有值的最大值，并将数据下采样到输出张量Y 中以进行进一步处理。输出空间形状的计算方式有所不同，具体取决于是否使用显式填充（在使用pads 的情况下）或使用 自动填充（在使用auto\_pad的情况下）。仅使用显式填充

输入列表

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

height∈(0,8192]

width∈(0,8192]

输出列表

output:T1

shape:[batch,channel,height,width]

属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

293

<!-- page 294 of 374 -->

kernel\_h∈(0,7]

kernel\_w∈(0,7]

注,不支持kernel\_h=1且kernel\_w=1

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

数据类型约束

T1:float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## GlobalMaxPool

GlobalMaxPool使用输入张量X并对同一通道中的值应用最大池化。这相当于MaxPool的kernel\_shape 大小等于input的空间维度。

输入列表

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

height∈(0,7]

width∈(0,7]

输出列表

output:T1

294

<!-- page 295 of 374 -->

shape:[batch,channel,height,width]

## 属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

kernel\_h∈(0,7]

kernel\_w∈(0,7] 注,不支持kernel\_h=1且kernel\_w=1

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

## 数据类型约束

T1:float16(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## AveragePool

不支持(工具端转换成卷积实现)

## GlobalAveragePool

不支持(工具端转换成卷积实现)

## Pow

295

<!-- page 296 of 374 -->

## Z =XY 指数运算，采用输入数据（张量）和指数，并产生一个输出数据（张量）

## 输入列表

X:T1 shape:[batch,channel,height,width]量化支持per-layer

Y:T2 shape:[1]当前仅支持0、1、2、3、0.5、-0.5

## 输出列表

Z:T1 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

T1:float16(Tensor)

T2:int8(Tensor),int32(Tensor),int64(Tensor),float16(Tensor),float(Tensor)

## 其他支持

## 多核联合:尚不支持

## Relu

将输入张量的负值设为零，正值保持不变

输入列表

input:T1 shape:[batch,channel,height,width]广播支持无

输出列表

output:T1 shape:[batch,channel,height,width]

296

<!-- page 297 of 374 -->

## 数据类型约束

T1:float16(Tensor)

其他支持

多核联合:暂不支持

## Clip/ReLU6

将输入张量的值裁剪到[0,6]范围内

输入列表

input:T1 shape:[batch,channel,height,width]广播支持无

输出列表

output:T1 shape:[batch,channel,height,width]

数据类型约束

T1:float16(Tensor)

其他支持

多核联合:暂不支持

## PRelu

将输入张量的负值按可学习参数缩放，正值保持不变

输入列表

input:T1 shape:[batch,channel,height,width]广播支持

无

输出列表

output:T1

297

<!-- page 298 of 374 -->

shape:[batch,channel,height,width]

属性列表

slope:PRelu系数

仅支持单个标量或C维度系数

数据类型约束

T1:float16(Tensor)

其他支持

多核联合:暂不支持

## LeakyRelu

将输入张量的负值按固定比例缩放，正值保持不变

输入列表

input:T1

shape:[batch,channel,height,width]

广播支持

无

输出列表

output:T1 shape:[batch,channel,height,width]

数据类型约束

T1:float16(Tensor)

其他支持

多核联合:暂不支持

## Reshape

在不改变输入数据和元素数量的情况下，返回一个具有指定形状的张量。

输入列表

input:T1

shape:[batch,channel,height,width]

298

<!-- page 299 of 374 -->

量化支持per-layer

输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

数据类型约束

T1:float16(Tensor)

属性列表

shape:int指定输出张量的形状

其他支持

多核联合:尚不支持

## Resize

调整输入张量的大小。一般来说，它将输出张量中的每个值计算为输入张量中邻域（即采样位置）的加权平均值

输入列表

X:T1 shape:[batch,channel,height,width]量化支持per-layer

roi(optional):T2目前暂不支持

scales(optional):T2沿每个维度的缩放比例数组

sizes(optional):T3输出张量的目标大小

输出列表

299

<!-- page 300 of 374 -->

Y:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:float16(Tensor)

T2:float(Tensor)

T3:int64(Tensor)

## 属性列表

antialias:int（默认值为0）

目前不支持设置

axes:int[]

目前不支持设置

coordinate\_transformation\_mode:strings（默认值为”half\_pixel”）目 前仅支持half\_pixel，pytorch\_half\_pixel，align\_corners三种

cubic\_coeff\_a:float（默认为-0.75）

目前不支持设置

exclude\_outside:int（默认值为0）

目前不支持设置

extrapolation\_value:float（默认为0）

目前不支持设置

keep\_aspect\_ratio\_policy:strings（默认值为”stretch”）

目前不支持设置

mode:strings（默认值为”nearest”）

目 前仅支持nearest和linear两种可配置

nearest\_mode:strings（默认值为”round\_prefer\_floor”）

目前不支持设置支持说明 目前仅支持宽高方向的整数倍缩放,且缩放倍数为2-8的整数倍,如果是(1,c,1,1)则支持放大到(1,c,h, w)

## Slice

获得当前向量的一个切片，具体规则和[numpy切片](https://numpy.org/doc/stable/user/basics.indexing.html)相同

输入列表

input\_tensor:T

300

<!-- page 301 of 374 -->

```txt
- shape:[batch,channel,height,width]
```

量化支持

```txt
• per-layer
```

输出列表

output:T

量化支持

```txt
- per-layer
```

数据类型约束

```txt
- T:float16(Tensor)
```

属性列表

starts:int(Tensor)

ends:int(Tensor)

axes:int(Tensor)

steps:int(Tensor)

选取切分对应轴的步长

```javascript
当height*width==1&&channel%subc==0&&starts[1]%subc==0&&ends[1]% subc==0&&steps[1]<=subc时,steps可以不为1，否则只有steps==[1,1,1,1]时，才可通过 NPU运行SliceOP
```

## Softmax

该运算符计算给定输入的归一化指数值:

```txt
Softmax(input, axis) = exp(input - max(input, axis)) / Σ_axis exp(input - max(input, axis))
```

“axis”属性表示Softmax执行的维度。输出张量具有相同的形状并包含相应输入的Softmax值。

输入列表

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

301

<!-- page 302 of 374 -->

```txt
- width: · axis=1,无限制; · axis=3/-1,width∈(0,8192] 且受限于transpose的规格限制
```

输出列表

```yaml
- output:T1
  - shape:[batch,channel,height,width]
```

数据类型约束

```txt
- T1:float16(Tensor)
属性列表
- axis:int64
    - 做softmax的轴:1,3，即channel和width方向
```

## exSoftmax13

该运算符计算给定输入的归一化指数值:

输入列表

```yaml
- input:T1
    - shape:[batch,channel,height,width]
        - channel∈(0,8192]
        - width: · axis=1,无限制; · axis=3/-1,width∈(0,8192] 且受限于transpose的规格限制
```

输出列表

```yaml
- output:T1
  - shape:[batch,channel,height,width]
```

数据类型约束

属性列表

302

<!-- page 303 of 374 -->

## exSoftmaxMask

尚不支持

## Split

将向量沿着axis方向分成num\_outputs个向量，split用于指定切分后向量在axis方向上的大小

输入列表

input\_tensor:T

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T

一或多个输出向量，由num\_outputs属性决定

shape:根据切分情况决定

量化支持

per-layer

数据类型约束

T:float16(Tensor)

属性列表

axis:int axis∈{0,1,2,3}

num\_outputs:int

split:int(Tensor)

## Sub

执行元素级二进制减法(C=A-B),支持多向Numpy样式的广播

输入列表

A:T1,T2

shape:[batch,channel,height,width]

量化支持

303

<!-- page 304 of 374 -->

## per-layer

广播支持[b,c,1,1] [scalar]

B:T1,T2

shape:[batch,channel,height,width]

量化支持per-layer

广播支持[b,c,1,1] [scalar]

## 输出列表

C:T1

shape:[batch,channel,height,width]

量化支持per-layer

## 数据类型约束

T1:float16(Tensor)

T2:float(constTensor)

## Tile

通过平铺给定的张量构造张量,这与Numpy中的函数tile相同，但没有广播

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持per-layer

repeats:T2

shape:[batch,channel,height,width]

输出列表

output:T1

304

<!-- page 305 of 374 -->

shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:int64(Tensor)

## Transpose

对输入张量进行转置

输入列表

X:T1 shape:[n1,c1,h1,w1]详细约束规则见属性列表量化支持per-layer

输出列表

Y:T1 shape:[n2,c2,h2,w2]详细约束规则见属性列表量化支持per-layer

## 属性列表

perm转置的轴顺序: 不同perm参数限制如下:(其中p=268435456,q=65536) perm=[0,1,2,3]无限制perm=[0,1,3,2] T1:h1%8=0,h1**w1<8**p,h1**w1<2**q perm=[0,2,3,1] T1:c1<8192,h1**w1%8=0**， **w1**c1<p\*8 perm=[0,2,1,3] T1:h1%8=0,h1**w1<8**p,h1**w1<2**q,c1\*w1<p

305

<!-- page 306 of 374 -->

perm=[0,3,1,2] $\circ \mathsf { T } \mathtt { 1 } \mathtt { : } \mathsf { h } \mathtt { 1 } w \mathtt { 1 } \mathtt { < } p \mathtt { , } w \mathtt { 1 } \mathtt { < } \mathtt { 8 } \mathtt { 1 } 9 \mathtt { 2 } \mathtt { , } h \mathtt { 1 } \mathtt { c } \mathtt { 1 } \mathtt { < } \mathtt { p }$

perm=[0,3,2,1] $\circ \mathsf{T1}{:}\mathsf{h1}\%8{=}0,\mathsf{h1}w\mathsf{I}{<}\mathcal{B}\mathsf{p},\mathsf{h1}w\mathsf{I}{<}2\mathsf{q},\mathsf{c1}{<}\mathsf{p}^*8$

perm=[1,0,2,3] T1:h1**w1<8**p,n1<8192,h1\*w1<p

perm=[1,0,3,2] $。  $\mathsf { T 1 } { : } \mathsf { h 1 } \% 8 { = } \mathsf { 0 } \mathsf { , } \mathsf { c 1 } h \mathtt { I w 1 } { < } 8 p \mathsf { , } h \mathtt { I w 1 } { < } 2 ^ { * } \mathsf { q }$$

perm=[1,2,0,3] T1:n1**w1<p**8,c1**h1**w1p,w1%8=0

perm=[1,2,3,0] T1:h1**w1<p,n1<p**8,c1**h1**w1<p**8,n1**w1<p\*8

perm=[1,3,0,2] T1:c1**w1<8192,n1**h1<p,w1%8=0

perm=[1,3,2,0] T1:c1**h1**w1<p,n1\*h1<p,w1<8192,w1%8=0

perm=[2,1,0,3] T1:c1<8192,c1**h1**w1<p,n1\*w1<p

perm=[2,1,3,0] T1:c1**h1**w1<p,n1**w1<p**8,c1<8192,n1\*w1%4=0

perm=[2,0,3,1] T1:c1<8192,c1**h1**w1<p

perm=[2,0,1,3] T1:n1**c1**h1**w1<p,h1**w1%8=0

perm=[2,3,1,0] $\circ \mathsf { T } \mathtt { 1 } \mathtt { : } \mathtt { c } \mathtt { 1 } \mathtt { h } \mathtt { I } \mathtt { w } \mathtt { 1 } \mathtt { < } \mathtt { p } \mathtt { , } \mathsf { n } \mathtt { 1 } \mathtt { c } \mathtt { I } \mathtt { < } \mathtt { p } \mathtt { , } \mathsf { h } \mathtt { I } \mathtt { w } \mathtt { 1 } \mathtt { < } \mathtt { 8 } \mathtt { 1 } \mathtt { 9 } \mathtt { 2 } \mathtt { , } \mathsf { h } \mathtt { 1 } \mathtt { * } \mathtt { w } \mathtt { 1 } \mathtt { \% 8 } \mathtt { = } \mathtt { 0 }$

perm=[2,3,0,1] T1:h1**w1<8192,n1**c1<p

perm=[3,0,2,1] 0 $\circ \mathsf { T } \mathtt { 1 } \mathtt { : } \mathsf { h } \mathtt { 1 } \mathtt { w } \mathtt { 1 } \mathtt { < } \mathtt { p } \mathtt { , } \mathsf { n } \mathtt { 1 } \mathtt { c } \mathtt { 1 } \mathtt { < } \mathtt { 8 } \mathtt { 1 } \mathtt { 9 } \mathtt { 2 } \mathtt { , } \mathtt { c } \mathtt { 1 } \mathtt { h } \mathtt { 1 } \mathtt { < } \mathtt { p } \mathtt { , } \mathsf { n } \mathtt { 1 } \mathtt { w } \mathtt { 1 } \mathtt { < } \mathtt { 8 } \mathtt { 1 } \mathtt { 9 } \mathtt { 2 } \mathtt { , } \mathsf { n } \mathtt { 1 } \mathtt { * } \mathtt { w } \mathtt { 1 } \mathtt { \% } \mathtt { 8 } \mathtt { = } 0$

perm=[3,0,1,2] $\circ \mathsf { T } \mathtt { 1 } \mathtt { : } \mathsf { h } \mathtt { 1 } \mathtt { w } \mathtt { 1 } \mathtt { < } \mathsf { p } \mathtt { , } \mathsf { n } \mathtt { 1 } \mathtt { c } \mathtt { 1 } \mathtt { < } \mathtt { 8 } \mathtt { 1 } \mathtt { 9 } \mathtt { 2 } \mathtt { , } \mathtt { c } \mathtt { 1 } \mathtt { h } \mathtt { 1 } \mathtt { < } \mathsf { p } \mathtt { , } \mathsf { n } \mathtt { 1 } \mathtt { w } \mathtt { 1 } \mathtt { < } \mathtt { 8 } \mathtt { 1 } \mathtt { 9 } \mathtt { 2 } \mathtt { , } \mathsf { n } \mathtt { 1 } \mathtt { h } \mathtt { 1 } \mathtt { w } \mathtt { 1 } \mathtt { \% } \mathtt { 8 } \mathtt { = } 0$

perm=[3,2,0,1] T1:h1**w1<p,n1**c1<8192,n1**c1**w1<p

perm=[3,2,1,0]

306

<!-- page 307 of 374 -->

```csv
T1:c1h1w1<p,h1w1<8192,2h1w1<q,n1c1<p*8,h1%8=0
perm=[3,1,0,2]
    T1:h1w1<p,c1w1<8192,n1*h1<p
perm=[3,1,2,0]
    T1:h1w1<p,n1c1<8192,n1h1<p,n1c1*w1<p
```

## 数据类型约束

```autohotkey
- T1:int16(Tensor),float16(Tensor)
```

其他支持

多核联合:暂不支持

## Sigmoid

给定输入张量，函数y=1/(1+exp(-x))按元素应用于输入张量，得到输出张量

输入列表

input:T1

量化支持

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

数据类型约束

T1:float16(Tensor)

## Tanh

计算给定输入张量单元的双曲正切

输入列表

X:T1

shape:[batch,channel,height,width]

307

<!-- page 308 of 374 -->

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

数据类型约束

T1:float16(Tensor)

## Softplus

按元素应用Softplus函数,y=ln(exp(x)+1)

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

数据类型约束

T1:float16(Tensor)

## HardSigmoid

给定输入张量，函数y=max(0,min(1,alpha\*x+beta))按元素应用于输入张量，得到输出张量，这里alpha=1/6，beta=0.5

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

308

<!-- page 309 of 374 -->

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:float16(Tensor)

## HardSwish

按元素应用 HardSwish 函数, y = x \* max(0, min(1, alpha \* x + beta)) = x \* HardSigmoid(x),这里alpha=1/6,beta=0.5

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

数据类型约束

T1:float16(Tensor)

## Elu

给定输入张量，函数f(x)=alpha\*(exp(x)-1.)forx<0,f(x)=xforx>=0按元素应用于输入张量，得到输出张量，这里alpha=1

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

309

<!-- page 310 of 374 -->

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:float16(Tensor)

## exSwish

按元素应用Sigmoid线性单元函数,Swish函数也称为SiLU函数,y=x\*sigmoid(x)

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

数据类型约束

T1:float16(Tensor)

## exMish

给定输入张量，函数mish(x)=x**tanh(softplus(x))=x**tanh(ln(1+e^{x}))按元素应用于输入张量，得到输出张量

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

310

<!-- page 311 of 374 -->

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:float16(Tensor)

## exGelu

给定输入张量，函数y =qx∗Φ(x)按元素应用于输入张量，得到输出张量，当Φ(x)函数设置成tanh时， y =0.5∗x∗(1+Tanh( 2 ∗(x+0.044715∗x3))) π

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:float16(Tensor)

## Where

根据mask\_tensor获取x\_tensor或y\_tensor的值，当mask\_tensor位置为True时，取x\_tensor对应位置的值，否则取y\_tensor的值。

输入列表

mask\_tensor:T1

shape:[batch,channel,height,width]

广播支持

支持任意维度广播操作

广播约束

311

<!-- page 312 of 374 -->

## 广播约束同Expand算子

x\_tensor:\*T2 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束广播约束同Expand算子

y\_tensor:T1

shape:[batch,channel,height,width]

量化支持

per-layer

广播支持

支持任意维度广播操作

广播约束

广播约束同Expand算子

输出列表

output:T2

shape:[batch,channel,height,width]

量化支持

per-layer

## 数据类型约束

T1:bool(Tensor)

T2:float16(Tensor)

## exConvStreaming

为了减少语音模型的时延，把原始卷积的输入分成若干个时间帧片，将每个时间帧片作为输入，计算卷积，最后将计算结果缓存起来供后续时间帧使用，从而达到音频流式处理的目的。

输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

312

<!-- page 313 of 374 -->

width: 目 前支持width=1。

## 量化支持

per-layer

## weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,31]

kernel\_w∈[1,31]

量化支持

per-layer

per-channel

## 输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 属性列表

strides:int(strides\_h,strides\_w)

stride\_h∈[1,7]

stride\_w∈[1,7]

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right)

pads\_top∈[0,15]

pads\_left∈[0,15]

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,32]

dilations\_w∈[1,32]

## 数据类型约束

T1:float16(Tensor)

## 其他支持

多核联合:尚不支持

313

<!-- page 314 of 374 -->

## exConvStreamingPRelu/LeakyRelu

exConvStreaming 与 PRelu/LeakyRelu 融合计算, Output = PRelu(exConvStreaming(Input)) 或者Output= LeakyRelu(exConvStreaming(Input)) 说明及规格限制同exConvStreaming

## exGlu

门控线性单元(GatedLinearUnit)函数,其中a是输入矩阵的前一半,b是后一半 GLU(a,b)=a⊗σ(b)

输入列表

Input:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Output:T1

shape:[batch,channel/2,height,width]

量化支持:per-layer

数据类型约束

T1:float16(Tensor)

属性列表

axis:int(默认值=1)

分割输入的维度

约束:仅支持1

## exMatMul

矩阵乘法操作

$$
Y = \left\{ \begin{array}{l l} A \cdot B + C & \text {if c\_type = "add"} \\ A \cdot B * C & \text {if c\_type = "mul"} \end{array} \right.
$$

输入列表

A:T1

shape:[b,k,1,n]

k ∈(0,8192]

314

<!-- page 315 of 374 -->

## 量化支持

per-layer

B:T1

shape:[b,k,1,m]

量化支持

per-layer

C(optional):T1,T2

shape:[b,n,1,m]

量化支持

per-layer

广播支持

支持任意维度广播操作

广播约束同Expand算子

输出列表

Y:T1

shape:[b,n,1,m]

量化支持

per-layer

数据类型约束

T1:float16(Tensor)

T2:float(Tensor)

属性列表

c\_type:strings(默认值“add”)

支持add和mul可选,表示C是做加法还是乘法

## exWindow

exWindow来源于[swin\_transformer](https://github.com/microsoft/Swin-Transformer/blob/main/models/swin_transformer.py)的window\_partition和window\_reverse操作。 原论文中输入特征被划分为多个不重叠的窗口，每个窗口的大小为window\_size× window\_size。要求输入和输出特征都为4维shape，在高和宽方向上都进行划分。 pytorch实现的计算方法如下:

315

<!-- page 316 of 374 -->

```python
def window_partition(x, window_size):
    """
    Args:
        x: (B, C, H, W)
        window_size (int): window size
    Returns:
        windows: (B, C, num_windows * num_windows, window_size * window_size)
    """
    B, C, H, W = x.shape
    x = x.view(B, C, H // window_size, window_size, W // window_size, window_size)
    windows = x.permute(0, 1, 2, 4, 3, 5).contiguous().view(B, C, -1, window_size * window_size)
    return windows

def window_reverse(windows, window_size, H, W):
    """
    Args:
        windows: (B, C, num_windows * num_windows, window_size * window_size)
        window_size (int): Window size
        H (int): Height of image
        W (int): Width of image
    Returns:
        x: (B, C, H, W)
    """
    B, C, _, _ = windows.shape
    x = windows.view(B, C, H // window_size, W // window_size, window_size, window_size)
    x = x.permute(0, 1, 2, 4, 3, 5).contiguous().view(B, C, H, W)
    return x
```

```txt
输入列表

• X:T1
    • shape:[batch,channel,height,width]

输出列表

• Y:T1
    • shape:[batch,channel,height,width]

数据类型约束

• T1:float16(Tensor)

属性列表

• mode:string
    • 支持模式:partition,reverse,partition_num_first
        • partition:参考window_partition实现;
        • reverse:参考window_reverse实现;
        • partition_num_first: 与 partition 的区别在于，partition_num_first 的 H,W 按照 num_windows进行划分，而partition的H,W按照window_sizes进行划分。
```

316

<!-- page 317 of 374 -->

window\_sizes:listofints

2维向量,窗口的大小。定义了每个窗口的高度和宽度。窗口内的注意力计算和特征提取都是基于这个大小。

num\_windows:listofints

2维向量,窗口的数量。定义了输入特征的高度和宽度被划分为多少个窗口。

## 其他支持

多核联合:尚不支持

## RV1103B/RV1106B

## Add

执行元素级二进制加法(C=A+B),支持多向Numpy样式的广播

输入列表

A:T1,T2 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

B:T1,T2 shape:[batch,channel,height,width]量化支持per-layer广播支持支持任意维度广播操作广播约束同Expand算子

输出列表

C:T1 shape:[batch,channel,height,width]量化支持per-layer

317

<!-- page 318 of 374 -->

## 数据类型约束

T1:int8(Tensor)

T2:float(constTensor)

## AddRelu

Add与Relu融合计算,C=Relu(A+B)输入列表同Add输出列表同Add其他支持多核联合:支持

## BatchNormalization

按照论文[https://arxiv.org/abs/1502.03167](https://arxiv.org/abs/1502.03167)中的描述对输入张量进行批量归一化计算

输入列表

input:T1 shape:[batch,channel,height,width]量化支持per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor)

属性列表

epsilon:float（默认值=1e-5）

318

<!-- page 319 of 374 -->

除以标准差时加上防止除0的实数

epsilon∈(0,∞]

momentum:float

训练时的滑动平均参数

## Concat

将一系列向量在axis指定的方向上组合成一个向量，所有向量除axis指定的方向外大小必须相同输入列表

input\_tensor:T shape:[batch,channel,height,width]量化支持per-layer

输出列表

output:T

shape:[batch,channel,height,width]

量化支持per-layer

数据类型约束

T:int8(Tensor)

属性列表

axisint64 axis∈{0,1,2,3}

## Convolution

卷积

输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

width: 当dilated\_kernel\_h>1时,width<16383。此外,对首层输入width存在限制，详见模型输入说明。

319

<!-- page 320 of 374 -->

## 量化支持

per-layer

## weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,31]

kernel\_w∈[1,31]

量化支持

per-layer

per-channel

## 输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 属性列表

strides:int(strides\_h,strides\_w)

stride\_h∈[1,7]

stride\_w∈[1,7]

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right)

pads\_top∈[0,15]

pads\_left∈[0,15]

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,31]

dilations\_w∈[1,31]

## 数据类型约束

T1:int8(Tensor)

## Depthwise Convolution

深度可分离卷积

320

<!-- page 321 of 374 -->

## 输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

width: 当dilated\_kernel\_h>1时,width<16383。此外,对首层输入width存在限制，详见模型输入说明。

量化支持

per-layer

weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,8]

kernel\_w∈[1,8]

量化支持

per-layer

per-channel

## 输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

## 属性列表

strides:int(strides\_h,strides\_w)

stride\_h∈[1,7]

stride\_w∈[1,7]

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right)

pads\_top∈[0,15]

pads\_left∈[0,15]

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,32]

dilations\_w∈[1,32]

## 数据类型约束

321

<!-- page 322 of 374 -->

T1:int8(Tensor)

## ConvolutionRelu

Convolution与Relu融合计算,Output=Relu(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionClip

Convolution与Clip融合计算,Output=Clip(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionPRelu/LeakyRelu

Convolution 与 PRelu/LeakyRelu 融合计算, Output = PRelu(Conv(Input)) 或者 Output =

LeakyRelu(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionAdd

Convolution与Add融合计算,Output=Add(Conv(Input0),Input1) 说明及规格限制同Convolution

## ConvolutionSigmoid

Convolution与Sigmoid融合计算,Output=Sigmoid(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionTanh

Convolution与Tanh融合计算,Output=Tanh(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionSoftplus

Convolution与Softplus融合计算,Output=Softplus(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionHardSigmoid

Convolution与HardSigmoid融合计算,Output=HardSigmoid(Conv(Input)) 说明及规格限制同

Convolution

## ConvolutionHardSwish

Convolution与HardSwish融合计算,Output=HardSwish(Conv(Input)) 说明及规格限制同Convolution

322

<!-- page 323 of 374 -->

## ConvolutionElu

Convolution与Elu融合计算,Output=Elu(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionSwish

Convolution与Swish融合计算,Output=Swish(Conv(Input)) 说明及规格限制同Convolution

## ConvolutionMish

Convolution与Mish融合计算,Output=Mish(Conv(Input)) 说明及规格限制同Convolution

## ConvTranspose

转置卷积

输入列表

input\_tensor:T1

shape:[batch,channel,height,width]

width: 当dilated\_kernel\_h>1时,width<16383。此外,对首层输入width存在限制，详见模型输入说明。

量化支持

per-layer

weight:T1

shape:[output\_channel,input\_channel,kernel\_h,kernel\_w]

kernel\_h∈[1,31]

kernel\_w∈[1,31]

量化支持

per-layer

per-channel

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

323

<!-- page 324 of 374 -->

## 属性列表

strides:int(strides\_h,strides\_w)

stride\_h∈[1,8]

stride\_w∈[1,8]

pads:int(pads\_top,pads\_left,pads\_bottom,pads\_right) 设置pad时注意: 不支持kernel\_h**dilations\_h-dilations\_h-pads\_top<0** 不支持**kernel\_w**dilations\_w-dilations\_wpads\_left<0 不支持stride\_h**(height-1)-pads\_top+1<output\_h** 不支持**stride\_w**(width-1)- pads\_left+1<output\_w

pads\_top∈[0,15]

pads\_left∈[0,15]

pads\_bottom∈[0,15]

pads\_right∈[0,15]

group:int

group:仅支持1,当且仅当num\_input=num\_output时支持num\_output

dilations:int(dilations\_h,dilations\_w)

dilations\_h∈[1,32]

dilations\_w∈[1,32]

当dilation不等于(1,1)时，只支持kernel=(1,1)

## 数据类型约束

T1:int8(Tensor)

## ConvTranposeRelu

ConvTranpose与Relu融合计算,Output=Relu(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposeClip

ConvTranpose与Clip融合计算,Output=Clip(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## ConvTranposePRelu/LeakyRelu

ConvTranpose与PRelu/LeakyRelu融合计算,Output=PRelu(ConvTranpose(Input))或者Output= LeakyRelu(ConvTranpose(Input)) 说明及规格限制同ConvTranspose

## Div

执行元素级二进制除法(C=A/B),支持多向Numpy样式的广播

324

<!-- page 325 of 374 -->

## 输入列表

## A:T1,T2

shape:[batch,channel,height,width]

量化支持per-layer

广播支持[b,c,1,1] [scalar]

B:T1,T2

shape:[batch,channel,height,width]

量化支持per-layer

广播支持[b,c,1,1] [scalar]

## 输出列表

C:T1 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

T1:float16(Tensor)

T2:float(constTensor)

## Expand

根据给定的 shape 和广播规则广播输入张量。广播规则类似于 numpy.array(input) \* numpy.ones(shape):维度右对齐；两个对应维度必须具有相同的值，或者其中一个等于1

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

325

<!-- page 326 of 374 -->

shape:T2

shape:[batch,channel,height,width]

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor)

T2:int64(Tensor)

广播约束

[b,c,1,w]->[b,c,h,w],h∈[1,8192]

[b,1,1,w]->[b,c,h,w],h∈[1,8192]

$\scriptstyle [ { \mathsf { b } } , { \mathsf { c } } , { \mathsf { h } } , { \mathsf { 1 } } ] - > [ { \mathsf { b } } , { \mathsf { c } } , { \mathsf { h } } , { \mathsf { w } } ] , { \mathsf { w } } \in [ { \mathsf { 1 } } , { \mathsf { 8 1 9 2 } } ]$

[b,1,h,1]->[b,c,h,w],w ∈[1,8192]

[b,c,1,1]->[b,c,h,w],h∈[1,8192],w ∈[1,8192]

## Max

计算输入张量的元素级最大值

输入列表

A:T1

shape:[batch,channel,height,width]

量化支持

per-layer

广播支持

支持任意维度广播操作

广播约束同Expand算子

B:T1

shape:[batch,channel,height,width]

量化支持

per-layer

广播支持

326

<!-- page 327 of 374 -->

支持任意维度广播操作

广播约束同Expand算子

## 输出列表

C:T1 shape:[batch,channel,height,width]量化支持per-layer/per-channel

数据类型约束

T1:int8(Tensor)

## 其他支持

多核联合:暂不支持

## Mul

执行元素级二进制乘法(C=A\*B),支持多向Numpy样式的广播

输入列表

A:T1,T2 shape:[batch,channel,height,width]

量化支持per-layer

广播支持支持任意维度广播操作广播约束同Expand算子

B:T1,T2 shape:[batch,channel,height,width]

量化支持per-layer

广播支持支持任意维度广播操作广播约束同Expand算子

## 输出列表

327

<!-- page 328 of 374 -->

C:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor)

T2:float(constTensor)

## MulRelu

Mul与Relu融合计算,C=Relu(A\*B)

输入列表

同Mul

输出列表

同Mul

其他支持

多核联合:支持

## Pad

给定一个包含要填充的数据的张量(data),包含轴的开始和结束填充数值的张量(pads),模式(mode),常量数值(constant\_value),生成一个填充张量(output)

输入列表

data:T1

shape:[batch,channel,height,width]

量化支持

per-layer

pads:T2

shape : [batch\_begin, channel\_begin, height\_begin, width\_begin, batch\_end, channel\_end,height\_end,width\_end]

constant\_value(optional):T3

shape:[1]

量化支持

328

<!-- page 329 of 374 -->

per-layer

## 输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor)

T2:int64(Tensor)

T3:float(Scalar),int8(Scalar),float16(Scalar)

属性列表

mode:string(默认值constant)

支持模式:constant,reflect

constant无限制

reflectchannel∈(0,8192],height∈(0,8192],width∈(0,8176]

其他支持

多核联合:尚不支持

## MaxPool

MaxPool消耗输入张量X并根据内核大小、步幅大小和pad长度在张量上应用最大池化。最大池化包括根据内核大小计算输入张量子集的所有值的最大值，并将数据下采样到输出张量Y中以进行进一步处理。 输出空间形状的计算方式有所不同，具体取决于是否使用显式填充（在使用pads的情况下）或使用 自 动填充（在使用auto\_pad的情况下）。仅使用显式填充

输入列表

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

height∈(0,7]

width∈(0,7]

输出列表

output:T1

329

<!-- page 330 of 374 -->

shape:[batch,channel,height,width]

## 属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

kernel\_h∈(0,7]

kernel\_w∈(0,7]

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

## 数据类型约束

T1:int8(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## GlobalMaxPool

GlobalMaxPool使用输入张量X并对同一通道中的值应用最大池化。这相当于MaxPool的kernel\_shape 大小等于input的空间维度。

输入列表

input:T1

shape:[batch,channel,height,width]

channel∈(0,8192]

height∈(0,7]

width∈(0,7]

330

<!-- page 331 of 374 -->

## 输出列表

output:T1

shape:[batch,channel,height,width]

## 属性列表

kernel\_shape:int64(kernel\_h,kernel\_w)

kernel\_h∈(0,7]

kernel\_w∈(0,7]

auto\_pad:string

pad的方式:仅支持NOTSET

ceil\_mode:int64

使用ceil或floor的方式计算输出的shape:不支持

strides:int64(strides\_h,strides\_w)

strides\_h∈(0,8]

strides\_w∈(0,8]

count\_include\_pad:int64[]

count\_include\_pad是否包含pad数值进行计算:1

pad:int64(pad\_top,pad\_left,pad\_bottom,pad\_right)

pad\_top∈[0,7]

pad\_left∈[0,7]

pad\_bottom∈[0,7]

pad\_right∈[0,7]

## 数据类型约束

T1:int8(Tensor)

T2:float(Tensor)

T3:float(Scalar)

## AveragePool

不支持(工具端转换成卷积实现)

## GlobalAveragePool

不支持(工具端转换成卷积实现)

331

<!-- page 332 of 374 -->

## Relu

将输入张量的负值设为零，正值保持不变

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持per-layer

广播支持无

输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

数据类型约束

T1:int8(Tensor)

其他支持

多核联合:暂不支持

## Clip/ReLU6

将输入张量的值裁剪到[0,6]范围内

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持per-layer

广播支持无

输出列表

output:T1

332

<!-- page 333 of 374 -->

shape:[batch,channel,height,width]

量化支持per-layer

## 数据类型约束

T1:int8(Tensor)

## 其他支持

多核联合:暂不支持

## PRelu

将输入张量的负值按可学习参数缩放，正值保持不变

输入列表

input:T1 shape:[batch,channel,height,width]

量化支持per-layer/per-channel

广播支持无

输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer/per-channel

## 属性列表

slope:PRelu系数仅支持单个标量或C维度系数

数据类型约束

T1:int8(Tensor)

## 其他支持

多核联合:暂不支持

333

<!-- page 334 of 374 -->

## LeakyRelu

将输入张量的负值按固定比例缩放，正值保持不变

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持per-layer

广播支持无

输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

数据类型约束

T1:int8(Tensor)

其他支持

多核联合:暂不支持

## Reshape

在不改变输入数据和元素数量的情况下，返回一个具有指定形状的张量。

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

334

<!-- page 335 of 374 -->

per-layer

数据类型约束

T1:int8(Tensor)

属性列表

shape:int指定输出张量的形状

其他支持

多核联合:尚不支持

## Resize

调整输入张量的大小。一般来说，它将输出张量中的每个值计算为输入张量中邻域（即采样位置）的加权平均值

输入列表

X:T1 shape:[batch,channel,height,width]量化支持per-layer

roi(optional):T2目前暂不支持

scales(optional):T2沿每个维度的缩放比例数组

sizes(optional):T3输出张量的目标大小

输出列表

Y:T1 shape:[batch,channel,height,width]量化支持per-layer

数据类型约束

T1:int8(Tensor)

335

<!-- page 336 of 374 -->

T2:float(Tensor)

T3:int64(Tensor)

## 属性列表

antialias:int（默认值为0）

目前不支持设置

axes:int[]目前不支持设置

coordinate\_transformation\_mode:strings（默认值为”half\_pixel”）目 前仅支持half\_pixel，pytorch\_half\_pixel，align\_corners三种

cubic\_coeff\_a:float（默认为-0.75）目前不支持设置

exclude\_outside:int（默认值为0）目前不支持设置

extrapolation\_value:float（默认为0）目前不支持设置

keep\_aspect\_ratio\_policy:strings（默认值为”stretch”）

目前不支持设置

mode:strings（默认值为”nearest”）目 前仅支持nearest和linear两种可配置

nearest\_mode:strings（默认值为”round\_prefer\_floor”）

目前不支持设置支持说明 目前仅支持宽高方向的整数倍缩放,且缩放倍数为2-8的整数倍,如果是(1,c,1,1)则支持放大到(1,c,h, w)

## Slice

获得当前向量的一个切片，具体规则和[numpy切片](https://numpy.org/doc/stable/user/basics.indexing.html)相同

输入列表

input\_tensor:T

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T

shape:[batch,channel,height,width]

336

<!-- page 337 of 374 -->

```txt
- 量化支持
  - per-layer
```

```txt
数据类型约束
• T:int8(Tensor)
属性列表
• starts:int(Tensor)
    - 切分的起始位置:无限制
• ends:int(Tensor)
    - 切分的终止位置:无限制
• axes:int(Tensor)
    - 选取切分的轴:支持任意0~3轴, 支持同时多轴选择
• steps:int(Tensor)
    - 选取切分对应轴的步长
    - 当height*width==1&&channel%subc==0&&starts[1]%subc==0&&ends[1]%subc==0&&steps[1]<=subc时,steps可以不为1, 否则只有steps==[1,1,1,1]时, 才可通过NPU运行SliceOP
```

## Softmax

该运算符计算给定输入的归一化指数值:

```txt
Softmax(input, axis) = exp(input - max(input, axis)) / Σ_axis exp(input - max(input, axis))
```

输入列表

```txt
- input:T1
    - shape:[batch,channel,height,width]
    - 受限于transpose的规格限制
```

输出列表

```yaml
- output:T1
  - shape:[batch,channel,height,width]
```

数据类型约束

```txt
• T1:int8(Tensor)
```

337

<!-- page 338 of 374 -->

## 属性列表

axis:int64

做softmax的轴:1,3，即channel和width方向

## exSoftmax13

该运算符计算给定输入的归一化指数值:

```julia
exSoftmax13(input, axis) = exp(input - max(input, axis)) / Σ_axis exp(input - max(input, axis))
```

“axis”属性表示Softmax执行的维度。输出张量具有相同的形状并包含相应输入的Softmax值。

输入列表

```txt
- input:T1
    - shape:[batch,channel,height,width]
    - 受限于transpose的规格限制
```

输出列表

```yaml
- output:T1
  - shape:[batch,channel,height,width]
```

数据类型约束

属性列表

做softmax的轴:1,3，即channel和width方向

## exSoftmaxMask

尚不支持

## Split

将向量沿着axis方向分成num\_outputs个向量，split用于指定切分后向量在axis方向上的大小

输入列表

input\_tensor:T

338

<!-- page 339 of 374 -->

shape:[batch,channel,height,width]

量化支持per-layer

## 输出列表

output:T

一或多个输出向量，由num\_outputs属性决定

shape:根据切分情况决定

量化支持per-layer

数据类型约束

T:int8(Tensor)

属性列表

axis:int axis∈{0,1,2,3}

num\_outputs:int

split:int(Tensor)

## Sub

执行元素级二进制减法(C=A-B),支持多向Numpy样式的广播

输入列表

A:T1,T2

shape:[batch,channel,height,width]

量化支持per-layer

广播支持[b,c,1,1] [scalar]

B:T1,T2

shape:[batch,channel,height,width]

量化支持

per-layer

339

<!-- page 340 of 374 -->

## 广播支持

[b,c,1,1]

[scalar]

## 输出列表

C:T1 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

T1:int8(Tensor)

T2:float(constTensor)

## Tile

通过平铺给定的张量构造张量,这与Numpy中的函数tile相同，但没有广播

## 输入列表

input:T1 shape:[batch,channel,height,width]量化支持per-layer

repeats:T2 shape:[batch,channel,height,width]

输出列表

output:T1 shape:[batch,channel,height,width]量化支持per-layer

## 数据类型约束

T1:int8(Tensor),float16(Tensor)

T2:int64(Tensor)

340

<!-- page 341 of 374 -->

## Transpose

对输入张量进行转置输入列表X:T1 shape:[n1,c1,h1,w1]详细约束规则见属性列表量化支持per-layer

输出列表

Y:T1,T2 shape:[n2,c2,h2,w2]详细约束规则见属性列表量化支持per-layer

属性列表

perm转置的轴顺序: 不同perm参数限制如下:(其中p=268435456,q=65536) perm=[0,1,2,3]无限制perm=[0,1,3,2] T1:h1%16=0,h1**w1<16**p,h1**w1<2**q T2:h1%8=0,h1**w1<8**p,h1**w1<2**q perm=[0,2,3,1] T1:c1<8192,h1**w1%8=0**， **w1**c1<p\*16 T2:c1<8192,h1**w1%8=0**， **w1**c1<p\*8 perm=[0,2,1,3] T1:h1%16=0,h1**w1<16**p,h1**w1<2**q,c1\*w1<p T2:h1%8=0,h1**w1<8**p,h1**w1<2**q,c1\*w1<p perm=[0,3,1,2] T1,T2:h1**w1<p,w1<8192,h1**c1<p perm=[0,3,2,1] T1:h1%16=0,h1**w1<16**p,h1**w1<2**q,c1<p\*16 T2:h1%8=0,h1**w1<8**p,h1**w1<2**q,c1<p\*8

341

<!-- page 342 of 374 -->

perm=[1,0,2,3] T1:h1**w1<16**p,n1<8192,h1\*w1<p T2:h1**w1<8**p,n1<8192,h1\*w1<p perm=[1,0,3,2] T1:h1%16=0,c1**h1**w1<16**p,h1**w1<2\*q T2:h1%8=0,c1**h1**w1<8**p,h1**w1<2\*q perm=[1,2,0,3] T1:n1**w1<p**16,c1**h1**w1<p,w1%16=0 T2:n1**w1<p**8,c1**h1**w1p,w1%8=0 perm=[1,2,3,0] T1:h1**w1<p,n1<p**16,c1**h1**w1<p**16,n1**w1<p\*16 T2:h1**w1<p,n1<p**8,c1**h1**w1<p**8,n1**w1<p\*8 perm=[1,3,0,2] T1:c1**w1<8192,n1**h1<p,w1%16=0 T2:c1**w1<8192,n1**h1<p,w1%8=0 perm=[1,3,2,0] T1:c1**h1**w1<p,n1\*h1<p,w1<8192,w1%16=0 T2:c1**h1**w1<p,n1\*h1<p,w1<8192,w1%8=0 perm=[2,1,0,3] T1,T2:c1<8192,c1**h1**w1<p,n1\*w1<p perm=[2,1,3,0] T1:c1**h1**w1<p,n1**w1<p**16,c1<8192,n1\*w1%4=0 T2:c1**h1**w1<p,n1**w1<p**8,c1<8192,n1\*w1%4=0 perm=[2,0,3,1] T1,T2:c1<8192,c1**h1**w1<p perm=[2,0,1,3] T1:n1**c1**h1**w1<p,h1**w1%16=0 T2:n1**c1**h1**w1<p,h1**w1%8=0 perm=[2,3,1,0] T1:c1**h1**w1<p,n1**c1<p,h1**w1<8192,h1\*w1%16=0 T2:c1**h1**w1<p,n1**c1<p,h1**w1<8192,h1\*w1%8=0 perm=[2,3,0,1] T1,T2:h1**w1<8192,n1**c1<p perm=[3,0,2,1] T1:h1**w1<p,n1**c1<8192,c1**h1<p,n1**w1<8192,n1\*w1%16=0

342

<!-- page 343 of 374 -->

```csv
- T2:h1w1<p,n1c1<8192,c1h1<p,n1w1<8192,n1*w1%8=0
```

perm=[3,0,1,2]

```csv
- T1:h1w1<p,n1c1<8192,c1h1<p,n1w1<8192,n1h1w1%16=0
```

```txt
• perm=[3,2,0,1]
```

```txt
- T1,T2:h1w1<p,n1c1<8192,n1c1w1<p
```

perm=[3,2,1,0]

```csv
- T1:c1h1w1<p,h1w1<8192,2h1w1<q,n1c1<p*16,h1%16=0
```

```txt
• perm=[3,1,0,2]
```

```csv
• T1,T2:h1w1<p,c1w1<8192,n1*h1<p
```

```txt
• perm=[3,1,2,0]
```

```csv
- T1,T2:h1w1<p,n1c1<8192,n1h1<p,n1c1*w1<p
```

## 数据类型约束

T1:int8(Tensor)

T2:int16(Tensor)

其他支持

多核联合:暂不支持

## Sigmoid

给定输入张量，函数y=1/(1+exp(-x))按元素应用于输入张量，得到输出张量

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

343

<!-- page 344 of 374 -->

## 数据类型约束

T1:int8(Tensor)

## Tanh

计算给定输入张量单元的双曲正切

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

数据类型约束

T1:int8(Tensor)

## Softplus

按元素应用Softplus函数,y=ln(exp(x)+1)

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

数据类型约束

T1:int8(Tensor)

## HardSigmoid

344

<!-- page 345 of 374 -->

给定输入张量，函数y=max(0,min(1,alpha\*x+beta))按元素应用于输入张量，得到输出张量，这里alpha=1/6，beta= 0.5

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor)

## HardSwish

按元素应用 HardSwish 函数, y = x \* max(0, min(1, alpha \* x + beta)) = x \* HardSigmoid(x),这里alpha=1/6, beta=0.5

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

数据类型约束

T1:int8(Tensor)

## Elu

345

<!-- page 346 of 374 -->

给定输入张量，函数f(x)=alpha\*(exp(x)-1.)forx<0,f(x)=xforx>=0 按元素应用于输入张量，得到输出张量，这里alpha=1

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor)

## exSwish

按元素应用Sigmoid线性单元函数,Swish函数也称为SiLU函数,y=x\*sigmoid(x)

输入列表

X:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Y:T1

shape:[batch,channel,height,width]

量化支持:per-layer

数据类型约束

T1:int8(Tensor)

## exMish

346

<!-- page 347 of 374 -->

给定输入张量，函数mish(x)=x**tanh(softplus(x))=x**tanh(ln(1+e^{x}))按元素应用于输入张量，得到输出张量

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor)

## exGelu

给定输入张量，函数y =x∗Φ(x)按元素应用于输入张量，得到输出张量，当Φ(x)函数设置成tanh时，

$$
y = 0. 5 * x * (1 + \operatorname{Tanh} (\sqrt {\frac {2}{\pi}} * (x + 0. 0 4 4 7 1 5 * x ^ {3})))
$$

输入列表

input:T1

shape:[batch,channel,height,width]

量化支持

per-layer

输出列表

output:T1

shape:[batch,channel,height,width]

量化支持

per-layer

数据类型约束

T1:int8(Tensor)

347

<!-- page 348 of 374 -->

## Where

根据mask\_tensor获取x\_tensor或y\_tensor的值，当mask\_tensor位置为True时，取x\_tensor对应位置的值，否则取y\_tensor的值。

输入列表

- - mask\_tensor:T1
- - shape:[batch,channel,height,width]
- - 广播支持
- - 支持任意维度广播操作
- - 广播约束
- - 广播约束同Expand算子
- - x\_tensor:\*T2
- - shape:[batch,channel,height,width]
- - 量化支持
- - per-layer
- - 广播支持
- - 支持任意维度广播操作
- - 广播约束
- - 广播约束同Expand算子
- - y\_tensor:T1
- - shape:[batch,channel,height,width]
- - 量化支持
- - per-layer
- - 广播支持
- - 支持任意维度广播操作
- - 广播约束
- - 广播约束同Expand算子
- 输出列表
- - output:T2
- - shape:[batch,channel,height,width]
- - 量化支持
- - per-layer

## 数据类型约束

348

<!-- page 349 of 374 -->

T1:bool(Tensor)

T2:int8(Tensor)

## exGlu

门控线性单元(GatedLinearUnit)函数,其中a是输入矩阵的前一半,b是后一半 GLU(a,b)=a⊗σ(b)

输入列表

Input:T1

shape:[batch,channel,height,width]

量化支持:per-layer

输出列表

Output:T1

shape:[batch,channel/2,height,width]

量化支持:per-layer

数据类型约束

T1:int8(Tensor)

属性列表

axis:int(默认值=1)

分割输入的维度

约束:仅支持1

## exMatMul

矩阵乘法操作

$$
Y = \left\{ \begin{array}{l l} A \cdot B + C & \text {if} c _ {-} t y p e = " \text {add}" \\ A \cdot B * C & \text {if} c _ {-} t y p e = " \text {mul}" \end{array} \right.
$$

输入列表

A:T1

shape:[b,k,1,n]

k ∈(0,8192]

量化支持

per-layer

349

<!-- page 350 of 374 -->

## B:T1

shape:[b,k,1,m]

量化支持

per-layer

C(optional):T1,T2

shape:[b,n,1,m]

量化支持

per-layer

广播支持

支持任意维度广播操作

广播约束同Expand算子

输出列表

Y:T1

shape:[b,n,1,m]

量化支持

per-layer

数据类型约束

T1:int8(Tensor)

T2:float(Tensor)

属性列表

c\_type:strings(默认值“add”)

支持add和mul可选,表示C是做加法还是乘法

## exWindow

exWindow来源于[swin\_transformer](https://github.com/microsoft/Swin-Transformer/blob/main/models/swin_transformer.py)的window\_partition和window\_reverse操作。 原论文中输入特征被划分为多个不重叠的窗口，每个窗口的大小为window\_size× window\_size。要求输入和输出特征都为4维shape，在高和宽方向上都进行划分。 pytorch实现的计算方法如下:

350

<!-- page 351 of 374 -->

```python
def window_partition(x, window_size):
    """
    Args:
        x: (B, C, H, W)
        window_size (int): window size
    Returns:
        windows: (B, C, num_windows * num_windows, window_size * window_size)
    """
    B, C, H, W = x.shape
    x = x.view(B, C, H // window_size, window_size, W // window_size, window_size)
    windows = x.permute(0, 1, 2, 4, 3, 5).contiguous().view(B, C, -1, window_size * window_size)
    return windows

def window_reverse(windows, window_size, H, W):
    """
    Args:
        windows: (B, C, num_windows * num_windows, window_size * window_size)
        window_size (int): Window size
        H (int): Height of image
        W (int): Width of image
    Returns:
        x: (B, C, H, W)
    """
    B, C, _, _ = windows.shape
    x = windows.view(B, C, H // window_size, W // window_size, window_size, window_size)
    x = x.permute(0, 1, 2, 4, 3, 5).contiguous().view(B, C, H, W)
    return x
```

## 输入列表

属性列表

partition\_num\_first: 与 partition 的区别在于，partition\_num\_first 的 H,W 按照num\_windows进行划分，而partition的H,W按照window\_sizes进行划分。

351

<!-- page 352 of 374 -->

window\_sizes:listofints

2维向量,窗口的大小。定义了每个窗口的高度和宽度。窗口内的注意力计算和特征提取都是基于这个大小。

num\_windows:listofints

2维向量,窗口的数量。定义了输入特征的高度和宽度被划分为多少个窗口。

## 其他支持

多核联合:尚不支持

3566/3568OP规格介绍

3588OP规格介绍

3562OP规格介绍

1103/1106OP规格介绍

3576/RV1126BOP规格介绍

2118OP规格介绍

1103B/1106BOP规格介绍

352

<!-- page 353 of 374 -->

## CPU OPs 规格介绍

## 注:

RK2118不支持所有CPU 算子

RV1106/RV1103/RV1106B/RV1103B仅支持部分CPU 算子如下

Concat, DataConvert, Div, exLayerNorm, Exp, Gather, ReduceL2, ReduceMax, Reshape, ScatterND,Softmax,Pow

## Add

**描述**:加法操作

**规格约束**:无限制

## AveragePool

**描述**:平均池化

**规格约束**:无限制

## ArgMin

**描述**:取最小值的index

**规格约束**:无限制

## ArgMax

**描述**:取最大值的index

**规格约束**:无限制

## BatchNormalization

**描述**:批量归一化

**规格约束**:无限制

## Cast

**描述**:数据类型转换

**规格约束**: SRC支持:float32/bool/int8/float16/int32/int64 DST支持:float32/int8/int32/float16

353

<!-- page 354 of 374 -->

## Clip

**描述**:数据截断激活层

**规格约束**:无限制

## Concat

**描述**:合并操作

**规格约束**:axis仅支持{0,1,2,3}

## Convolution

**描述**:卷积操作

**规格约束**:无限制

## ConvTranspose/Deconvolution

**描述**:转置卷积

**规格约束**:无限制

## ConvTransposePad

**描述**:组合OP

**规格约束**:无限制

## Cos

**描述**:余弦函数

**规格约束**:无限制

## DataConvert

**描述**:数据类型转换

**规格约束**:仅支持bool/int8/float类型转换

## DepthToSpace

**描述**:通道方向空间方向转换

354

<!-- page 355 of 374 -->

**规格约束**:无限制

## Div

**描述**:除法操作

**规格约束**:无限制

## Equal

**描述**:等于

**规格约束**:无限制

## Exp

**描述**:指数函数

**规格约束**:无限制

## Flatten

**描述**:拉平操作

**规格约束**:无限制

## Gather

**描述**:聚集操作

**规格约束**:无限制

## Greater

**描述**:大于

**规格约束**:无限制

## GreaterOrEqual

**描述**:大等于

**规格约束**:无限制

## GRU

355

<!-- page 356 of 374 -->

**描述**:门控循环单元

**规格约束**:无限制

## exGRU

**描述**:门控循环单元

**规格约束**:无限制

说明:ONNX扩展算子

## exHardSwish

**描述**:激活函数

**规格约束**:无限制

说明:ONNX扩展算子

## InstanceNormalization

**描述**:单例归一化

**规格约束**:无限制

## exLayerNorm

**描述**:层归一化

**规格约束**:无限制

说明:ONNX扩展算子

## Less

**描述**:小于

**规格约束**:无限制

## LessOrEqual

**描述**:小等于

**规格约束**:无限制

356

<!-- page 357 of 374 -->

## LogSoftmax

**描述**:激活函数

**规格约束**:batchsize仅支持1

## LpNormalization

**描述**:Lp归一化

**规格约束**:无限制

## exLRN

**描述**:局部响应归一化

**规格约束**:无限制

说明:ONNX扩展算子

## MatMul

**描述**:多维矩阵相乘

**规格约束**:无限制(支持四维x四维、四维x三维计算)

## Max

**描述**:取最大值

**规格约束**:无限制

## MaxPool

**描述**:最大池化

**规格约束**:无限制

## MaxRoiPool

**描述**:区域最大池化

**规格约束**:无限制

## MaxUnpool

357

<!-- page 358 of 374 -->

**描述**:反向最大池化

**规格约束**:无限制

## exMish

**描述**:激活函数

**规格约束**:无限制

说明:ONNX扩展算子

## Min

**描述**:取最小值

**规格约束**:无限制

## Mul

**描述**:乘法

**规格约束**:无限制

## Pad

**描述**:填充

**规格约束**:无限制

## Pow

**描述**:指数计算

**规格约束**:无限制

## exProposal

**描述**:区域提议网络

**规格约束**:batchsize仅支持1

说明:ONNX扩展算子

## ReduceMax

358

<!-- page 359 of 374 -->

**描述**:沿指定维度计算Max

**规格约束**:输出维度不能超过4维

## ReduceMean

**描述**:沿指定维度计算Mean

**规格约束**:输出维度不能超过4维

## ReduceSum

**描述**:沿指定维度计算Sum

**规格约束**:输出维度不能超过4维

## ReduceMin

**描述**:沿指定维度计算Min

**规格约束**:输出维度不能超过4维

## Reorg

**描述**:数据重排

**规格约束**:无限制

## Reshape

**描述**:数据形状改变

**规格约束**:无限制

## Resize

**描述**:数据宽高方向缩放

**规格约束**:支持插值方式bilinear;nearest2d

## ReverseSequence

**描述**:序列翻转

**规格约束**:无限制

359

<!-- page 360 of 374 -->

## exRMSNorm

**描述**:均方根归一化

**规格约束**:无限制

说明:ONNX扩展算子

## RoiAlign

**描述**:区域对齐池化

**规格约束**:仅支持AvgPoolMode,batchsize仅支持1

## ScatterND

**描述**:N维索引取数

**规格约束**:无限制

## Sin

**描述**:正弦函数

**规格约束**:无限制

## Slice

**描述**:切片操作

**规格约束**:batchsize仅支持1

## Softmax

**描述**:激活函数

**规格约束**:batchsize仅支持1

说明:与ONNXOPSET11规范一致

## exSoftmax13

**描述**:激活函数

**规格约束**:batchsize仅支持1

说明:ONNX扩展算子，与ONNXOPSET13规范一致

360

<!-- page 361 of 374 -->

## SpaceToDetph

**描述**:空间方向向通道方向转换

**规格约束**:无限制

## Split

**描述**:拆分数据

**规格约束**:无限制

## Sqrt

**描述**:求平方根

**规格约束**:无限制

## Squeeze

**描述**:压缩数据维度

**规格约束**:无限制

## Sub

**描述**:减法

**规格约束**:无限制

## Tanh

**描述**:双曲正切函数

**规格约束**:无限制

## Tile

**描述**:扩充拷贝数据

**规格约束**:batchsize仅支持1,不支持broadcasting

## Transpose

**描述**:转置计算

**规格约束**:无限制

361

<!-- page 362 of 374 -->

## Upsample

**描述**:上采样

**规格约束**:支持插值方式bilinear;nearest2d

## Not

**描述**:按元素取非

**规格约束**:无限制

## where

**描述**:通过mask取数

**规格约束**:无限制

## Erf

**描述**:误差函数

**规格约束**:无限制

## Floor

**描述**:向下取整函数

**规格约束**:无限制

## Mod

**描述**:取模函数

**规格约束**:无限制

## exMeanVarianceNormalization

**描述**:均方差归一化函数

**规格约束**:无限制

## And

**描述**:与函数

362

<!-- page 363 of 374 -->

**规格约束**:无限制

## GatherElements

**描述**:元素收集函数

**规格约束**:无限制

**描述**:Log函数

**规格约束**:无限制

## exDataConvert

**描述**:精度转换

**规格约束**:无限制

## SpaceToDepth

**描述**:维度变换

**规格约束**:无限制

## SoftmaxMask

**描述**:where融合softmax的激活函数

**规格约束**:无限制

## TransposeReshape

**描述**:组合OP

**规格约束**:无限制

## ReshapeTranspose

**描述**:组合OP

**规格约束**:无限制

## ReduceL2

363

<!-- page 364 of 374 -->

**描述**:沿某一轴的L2范数

**规格约束**:无限制

## LayerNormalization

**描述**:层标准化

**规格约束**:无限制

## PassThrough

**描述**:直接连接

**规格约束**:无限制

## Expand

**描述**:张量数据复制或扩展

**规格约束**:无限制

## Sigmoid

**描述**:激活函数

**规格约束**:无限制

## Tanh

**描述**:三角函数

**规格约束**:无限制

## Cos

**描述**:三角函数

**规格约束**:无限制

## Sin

**描述**:三角函数

**规格约束**:无限制

364

<!-- page 365 of 374 -->

## exSwish

**描述**:激活函数

**规格约束**:无限制

## exGlu

**描述**:激活函数

**规格约束**:无限制

## exGelu

**描述**:激活函数

**规格约束**:无限制

## exWindow

**描述**:exWindow来源于Swin-Transformer的window\_partition和window\_reverse操作

**规格约束**:无限制

## exNorm

**描述**:当mode设置为‘pixel‘时，exNorm将使用PixelNorm进行归一化。mode缺省时，exNorm 默认使用LayerNorm进行归一化。

**规格约束**:无限制

## Round

**描述**:数据饱和

**规格约束**:无限制

## TopK

**描述**:获取数值排行前K个数据

**规格约束**:无限制

## exSwooshR

365

<!-- page 366 of 374 -->

**描述**:激活函数

**规格约束**:无限制

## exSwooshL

**描述**:激活函数

**规格约束**:无限制

## OneHot

**描述**:独热编码

**规格约束**:无限制

## Cumsum

**描述**:指定维度上进行累加

**规格约束**:无限制

366

<!-- page 367 of 374 -->

## GPU OPs 规格介绍

## 注:

RV1106/RV1103/RV1106B/RV1103B/RV1126B/RK2118不支持GPU 算子

RK356X暂未支持GridSample,exGelu

## GridSample

**描述**:插值采样

**规格约束**:仅支持FP16,插值算法仅支持bilinear,padding\_mode仅支持zeros

## GRU

**描述**:门控循环单元

**规格约束**:仅支持hidden\_size是4对齐的情况,不支持input\_size和hidden\_size小于4的情况

## exGelu

**描述**:激活函数

**规格约束**:暂支持Int8实现

367

<!-- page 368 of 374 -->

## 模型输入输出限制说明

## 模型输入限制说明

1. 该对齐约束仅针对零拷贝 API，普通 API 无此对齐约束

2. 输入宽的对齐要求可从零拷贝 API 中的 w\_stride 属性查询到，注意: w\_stride 不支持更改

3. 仅对输入宽(width)在不同的通道(channel)条件下有对齐要求，其他无约束

4. 若输入不需要 mean 和 scale，需要将 mean 和 scale 配置为 0 和 1

5. 若通道(channel)>4，则 mean/scale 将统一使用第一个数值，即 mean[0]和 scale[0]

6. 若首层为浮点类型则没有 quant 操作

7. RV1106/RV1103/RV1103B 不支持 CPU 的 mean/scale/quant 操作

8. 详细的用法请参考《Rockchip\_RKNPU\_User\_Guide\_RKNN\_SDK》

## RK3566/RK3568

<table><tr><td rowspan="2">芯片平台</td><td rowspan="2">模型首层精度类型</td><td rowspan="2">输入维度</td><td rowspan="2">首层设置输入数据类型</td><td rowspan="2">mean/scale/quant后端实现设备</td><td colspan="2">输入宽(width)对齐要求单位:元素个数</td><td colspan="2">输入宽(width)大小限制</td></tr><tr><td>当输入通道(channel)为1,3,4</td><td>当输入通道(channel)非1,3,4</td><td>当输入通道(channel)为1,3,4</td><td>当输入通道(channel)非1,3,4</td></tr><tr><td rowspan="9">RK3566/3568</td><td rowspan="4">int8</td><td rowspan="8">4维度</td><td>uint8</td><td rowspan="2">NPU</td><td rowspan="4">8</td><td rowspan="4">1</td><td rowspan="4">各卷积类型的width/kernel_h/kernel_w需要满足以下两式:1.width*dilation_kernel_h&lt;1024*N2.2.width&lt;=4096其中N必须为1到7的整数,超出范围的卷积不受支持,各卷积类型N的计算方式如下:Convolution:N=8-CEIL((dilation_kernel_h*dilation_kernel_w)/128)Depthwise Convolution:N=8-CEIL((dilation_kernel_h*dilation_kernel_w)/4096)ConvTranspose/Deconvolution:N=8-CEIL((dilation_kernel_h*dilation_kernel_w)/128)</td><td rowspan="4">无限制</td></tr><tr><td>int8</td></tr><tr><td>float16</td><td rowspan="2">CPU</td></tr><tr><td>其他类型输入对齐要求可能变动</td></tr><tr><td rowspan="4">float16</td><td>uint8</td><td rowspan="4">CPU</td><td rowspan="4">4</td><td rowspan="4">1</td><td rowspan="4">各卷积类型的width/kernel_h/kernel_w需要满足以下两式:1.width*dilation_kernel_h&lt;1024*N2.2.width&lt;=4096其中N必须为1到7的整数,超出范围的卷积不受支持,各卷积类型N的计算方式如下:Convolution:N=8-CEIL((dilation_kernel_h*dilation_kernel_w)/128)Depthwise Convolution:N=8-CEIL((dilation_kernel_h*dilation_kernel_w)/4096)ConvTranspose/Deconvolution:N=8-CEIL((dilation_kernel_h*dilation_kernel_w)/128)</td><td rowspan="4">无限制</td></tr><tr><td>int8</td></tr><tr><td>float16</td></tr><tr><td>其他类型输入对齐要求可能变动</td></tr><tr><td>无限制</td><td>非4维</td><td>非限制</td><td>CPU</td><td>1</td><td>1</td><td>无限制</td><td>无限制</td></tr></table>

## RK3588

368

<!-- page 369 of 374 -->

<table><tr><td rowspan="2">芯片平台</td><td rowspan="2">模型首层精度类型</td><td rowspan="2">输入维度</td><td rowspan="2">首层设置输入数据类型</td><td rowspan="2">mean/scale/quant后端实现设备</td><td colspan="2">输入宽(width)对齐要求单位:元素个数</td><td colspan="2">输入宽(width)大小限制</td></tr><tr><td>当输入通道(channel)为1,3,4</td><td>当输入通道(channel)非1,3,4</td><td>当输入通道(channel)为1,3,4</td><td>当输入通道(channel)非1,3,4</td></tr><tr><td rowspan="9">RK3588</td><td rowspan="4">int8</td><td rowspan="8">4维度</td><td>uint8</td><td rowspan="2">NPU</td><td rowspan="4">16</td><td rowspan="4">1</td><td rowspan="4">各卷积类型的width/kernel_h/kernel_w需要满足以下两式:1.width*dilation_kernel_h&lt;=2048*N2.width&lt;=8192其中N必须为1到7的整数,超出范围的卷积不受支持,各卷积类型N的计算方式如下:Convolution:N=12-MAX(CEIL((dilation_kernel_h*dilation_kernel_w)/128),3)Depthwise Convolution:N=12-MAX(CEIL((dilation_kernel_h*dilation_kernel_w)/2048),3)ConvTranspose/Deconvolution:N=12-MAX(CEIL((dilation_kernel_h*dilation_kernel_w)/128),3)</td><td rowspan="4">无限制</td></tr><tr><td>int8</td></tr><tr><td>float16</td><td rowspan="2">CPU</td></tr><tr><td>其他类型输入对齐要求可能变动</td></tr><tr><td rowspan="4">float16</td><td>uint8</td><td rowspan="4">CPU</td><td rowspan="4">8</td><td rowspan="4">1</td><td rowspan="4">各卷积类型的width/kernel_h/kernel_w需要满足以下两式:1.width*dilation_kernel_h&lt;=1024*N2.width&lt;=8192其中N必须为1到7的整数,超出范围的卷积不受支持,各卷积类型N的计算方式如下:Convolution:N=12-MAX(CEIL((dilation_kernel_h*dilation_kernel_w)/128),3)Depthwise Convolution:N=12-MAX(CEIL((dilation_kernel_h*dilation_kernel_w)/2048),3)ConvTranspose/Deconvolution:N=12-MAX(CEIL((dilation_kernel_h*dilation_kernel_w)/128),3)</td><td rowspan="4">无限制</td></tr><tr><td>int8</td></tr><tr><td>float16</td></tr><tr><td>其他类型输入对齐要求可能变动</td></tr><tr><td>无限制</td><td>非4维</td><td>非限制</td><td>CPU</td><td>1</td><td>1</td><td>无限制</td><td>无限制</td></tr></table>

## RV1103/RV1106

<table><tr><td rowspan="2">芯片平台</td><td rowspan="2">模型首层精度类型</td><td rowspan="2">输入维度</td><td rowspan="2">首层设置输入数据类型</td><td rowspan="2">mean/scale/quant后端实现设备</td><td colspan="2">输入宽(width)对齐要求单位:元素个数</td><td colspan="2">输入宽(width)大小限制</td></tr><tr><td>当输入通道(channel)为1,3,4</td><td>当输入通道(channel)非1,3,4</td><td>当输入通道(channel)为1,3,4(声明见注释9)</td><td>当输入通道(channel)非1,3,4</td></tr><tr><td>RV1103/1106</td><td>int8</td><td>4维度</td><td>uint8</td><td>NPU</td><td>16</td><td>1</td><td>各卷积类型的width/kernel_h/kernel_w需要满足以下两式:1.width*dilation_kernel_h&lt;=2048*N2.width&lt;=4096其中N必须为1到7的整数,超出范围的卷积不受支持,各卷积类型N的计算方式如下:Convolution:N=8-MAX(CEIL((dilation_kernel_h*dilation_kernel_w)/128),2)Depthwise Convolution:N=8-CEIL((dilation_kernel_h*dilation_kernel_w)/4096)ConvTranspose/Deconvolution:N=8-MAX(CEIL((dilation_kernel_h*dilation_kernel_w)/128),2)</td><td>无限制</td></tr></table>

## RK3562

369

<!-- page 370 of 374 -->

<table><tr><td rowspan="2">芯片平台</td><td rowspan="2">模型首层精度类型</td><td rowspan="2">输入维度</td><td rowspan="2">首层设置输入数据类型</td><td rowspan="2">mean/scale/quant后端实现设备</td><td colspan="2">输入宽(width)对齐要求单位:元素个数</td><td colspan="2">输入宽(width)大小限制</td></tr><tr><td>当输入通道(channel)为1,3,4</td><td>当输入通道(channel)非1,3,4</td><td>当输入通道(channel)为1,3,4</td><td>当输入通道(channel)非1,3,4</td></tr><tr><td rowspan="9">RK3562</td><td rowspan="4">int8</td><td rowspan="8">4维度</td><td>uint8</td><td rowspan="2">NPU</td><td rowspan="4">16</td><td rowspan="4">1</td><td rowspan="4">各卷积类型的width/kernel_h/kernel_w需要满足以下两式:1.width*dilation_kernel_h&lt;=2048*N2.width&lt;=4096其中N必须为1到7的整数,超出范围的卷积不受支持,各卷积类型N的计算方式如下:Convolution:N=8-MAX(CEIL((dilation_kernel_h*dilation_kernel_w)/128),2)Depthwise Convolution:N=8-CEIL((dilation_kernel_h*dilation_kernel_w)/4096)ConvTranspose/Deconvolution:N=8-MAX(CEIL((dilation_kernel_h*dilation_kernel_w)/128),2)</td><td rowspan="4">无限制</td></tr><tr><td>int8</td></tr><tr><td>float16</td><td rowspan="2">CPU</td></tr><tr><td>其他类型输入对齐要求可能变动</td></tr><tr><td rowspan="4">float16</td><td>uint8</td><td rowspan="4">CPU</td><td rowspan="4">8</td><td rowspan="4">1</td><td rowspan="4">各卷积类型的width/kernel_h/kernel_w需要满足以下两式:1.width*dilation_kernel_h&lt;=2048*N2.width&lt;=4096其中N必须为1到7的整数,超出范围的卷积不受支持,各卷积类型N的计算方式如下:Convolution:N=8-MAX(CEIL((dilation_kernel_h*dilation_kernel_w)/128),2)Depthwise Convolution:N=8-CEIL((dilation_kernel_h*dilation_kernel_w)/4096)ConvTranspose/Deconvolution:N=8-MAX(CEIL((dilation_kernel_h*dilation_kernel_w)/128),2)</td><td rowspan="4">无限制</td></tr><tr><td>int8</td></tr><tr><td>float16</td></tr><tr><td>其他类型输入对齐要求可能变动</td></tr><tr><td>无限制</td><td>非4维</td><td>非限制</td><td>CPU</td><td>1</td><td>1</td><td>无限制</td><td>无限制</td></tr></table>

## RK3576/RV1126B

<table><tr><td rowspan="2">芯片平台</td><td rowspan="2">模型首层精度类型</td><td rowspan="2">输入维度</td><td rowspan="2">首层设置输入数据类型</td><td rowspan="2">mean/scale/quant后端实现设备</td><td colspan="2">输入宽(width)对齐要求单位:元素个数</td><td colspan="2">输入宽(width)大小限制</td></tr><tr><td>当输入通道(channel)为1,3,4</td><td>当输入通道(channel)非1,3,4</td><td>当输入通道(channel)为1,3,4</td><td>当输入通道(channel)非1,3,4</td></tr><tr><td rowspan="9">RK3576/RV1126B</td><td rowspan="4">int8</td><td rowspan="8">4维度</td><td>uint8</td><td rowspan="2">NPU</td><td rowspan="4">16</td><td rowspan="4">1</td><td rowspan="4">各卷积类型的width/kernel_h/kernel_w需要满足以下两式:1.width*dilation_kernel_h&lt;=2048*N2.width&lt;=4096其中N必须为1到7的整数,超出范围的卷积不受支持,各卷积类型N的计算方式如下:Convolution:N=8-MAX(CEIL((dilation_kernel_h*dilation kernel w)/128),2)Depthwise Convolution:N=8-CEIL((dilation_kernel_h*dilation_kernel_w)/2048)ConvTranspose/Deconvolution:N=8-MAX(CEIL((dilation kernel h*dilation kernel w)/128),2)</td><td rowspan="4">无限制</td></tr><tr><td>int8</td></tr><tr><td>float16</td><td rowspan="2">CPU</td></tr><tr><td>其他类型输入对齐要求可能变动</td></tr><tr><td rowspan="4">float16</td><td>uint8</td><td rowspan="4">CPU</td><td rowspan="4">8</td><td rowspan="4">1</td><td rowspan="4">各卷积类型的width/kernel_h/kernel_w需要满足以下两式:1.width*dilation_kernel_h&lt;=2048*N2.width&lt;=4096其中N必须为1到7的整数,超出范围的卷积不受支持,各卷积类型N的计算方式如下:Convolution:N=8-MAX(CEIL((dilation_kernel_h*dilation kernel w)/128),2)Depthwise Convolution:N=8-MAX(CEIL((dilation_kernel_h*dilation_kernel_w)/2048),3)ConvTranspose/Deconvolution:N=12-MAX(CEIL((dilation kernel h*dilation kernel w)/128),2)</td><td rowspan="4">无限制</td></tr><tr><td>int8</td></tr><tr><td>float16</td></tr><tr><td>其他类型输入对齐要求可能变动</td></tr><tr><td>无限制</td><td>非4维</td><td>非限制</td><td>CPU</td><td>1</td><td>1</td><td>无限制</td><td>无限制</td></tr></table>

## RK2118

370

<!-- page 371 of 374 -->

<table><tr><td rowspan="2">芯片平台</td><td rowspan="2">模型首层精度类型</td><td rowspan="2">输入维度</td><td rowspan="2">首层设置输入数据类型</td><td rowspan="2">mean/scale/quant后端实现设备</td><td colspan="2">输入宽(width)对齐要求单位:元素个数</td><td colspan="2">输入宽(width)大小限制</td></tr><tr><td>当输入通道(channel)为1,3,4</td><td>当输入通道(channel)非1,3,4</td><td>当输入通道(channel)为1,3,4</td><td>当输入通道(channel)非1,3,4</td></tr><tr><td rowspan="2">RK2118</td><td rowspan="2">float16</td><td>4维度</td><td rowspan="2">float16</td><td rowspan="2">CPU</td><td>4</td><td>1</td><td rowspan="2">各卷积类型的width/kernel_h/kernel_w需要满足以下两式:3.width*dilation_kernel_h&lt;=2048*N4.width&lt;=4096其中N必须为1到7的整数,超出范围的卷积不受支持,各卷积类型N的计算方式如下:Convolution:N=8-MAX(CEIL((dilation_kernel_h*dilation_kernel_w)/128),2)Depthwise Convolution:N=8-CEIL((dilation_kernel_h*dilation_kernel_w)/4096)ConvTranspose/Deconvolution:N=8-MAX(CEIL((dilation_kernel_h*dilation_kernel_w)/128),2)</td><td rowspan="2">无限制</td></tr><tr><td>非4维</td><td>1</td><td>1</td></tr></table>

## RV1103B

<table><tr><td rowspan="2">芯片平台</td><td rowspan="2">模型首层精度类型</td><td rowspan="2">输入维度</td><td rowspan="2">首层设置输入数据类型</td><td rowspan="2">mean/scale/quant后端实现设备</td><td colspan="2">输入宽(width)对齐要求单位:元素个数</td><td colspan="2">输入宽(width)大小限制</td></tr><tr><td>当输入通道(channel)为1,3,4</td><td>当输入通道(channel)非1,3,4</td><td>当输入通道(channel)为1,3,4(声明见注释9)</td><td>当输入通道(channel)非1,3,4</td></tr><tr><td rowspan="2">RV1103B/RV1106B</td><td rowspan="2">int8</td><td rowspan="2">4维度</td><td>uint8</td><td rowspan="2">NPU</td><td rowspan="2">8</td><td rowspan="2">1</td><td rowspan="2">各卷积类型的width/kernel_h/kernel_w需要满足以下两式:1.width*dilation_kernel_h&lt;=2048*N2.width&lt;=4096其中N必须为1到7的整数,超出范围的卷积不受支持,各卷积类型N的计算方式如下:Convolution:N=8-MAX(CEIL((dilation_kernel_h*dilation_kernel_w)/128),2)Depthwise Convolution:N=8-CEIL((dilation_kernel_h*dilation_kernel_w)/4096)ConvTranspose/Deconvolution:N=8-MAX(CEIL((dilation_kernel_h*dilation_kernel_w)/128),2)</td><td rowspan="2">无限制</td></tr><tr><td>int8</td></tr></table>

## 模型输出限制说明

1. 如果输出 tensor 类型是 NHWC 的，输出转换是 NPU 实现的输出，则有对齐要求，CPU 实现的没有对齐要求。

2. 输出精度类型 int8/float16 表示模型最后一层原始输出的数据类型。

3. NCHW 输出，如果是 NPU 实现采用零拷贝接口则输出内存开辟的 size 以 query 出来的 size 为准。

4. NC1HWC2 输出，输出内存开辟的 size 以 query 出来的 size 为准。

## RK3566/RK3568

<table><tr><td>芯片平台</td><td>模型输出精度类型</td><td>输出维度</td><td>设置输出Layout</td><td>Channel 对齐要求</td><td>H*W 对齐要求</td></tr><tr><td rowspan="9">RK3566/RK3568</td><td rowspan="4">int8</td><td rowspan="8">4维度</td><td>NCHW</td><td>无</td><td>无</td></tr><tr><td>NHWC</td><td>8对齐</td><td>无</td></tr><tr><td>NC1HWC2</td><td>最后一层卷积类算子,16对齐,最后一层非卷积类算子8对齐</td><td>H*W要4对齐</td></tr><tr><td>UNDEFINE</td><td>无</td><td>无</td></tr><tr><td rowspan="4">float16</td><td>NCHW</td><td>无</td><td>无</td></tr><tr><td>NHWC</td><td>4对齐</td><td></td></tr><tr><td>NC1HWC2</td><td>最后一层卷积类算子,8对齐,最后一层非卷积类算子4对齐</td><td>H*W要4对齐</td></tr><tr><td>UNDEFINE</td><td>无</td><td>无</td></tr><tr><td>无限制</td><td>非4维度</td><td>UNDEFINE</td><td>无</td><td>无</td></tr></table>

## RK3588

371

<!-- page 372 of 374 -->

<table><tr><td>芯片平台</td><td>模型输出精度类型</td><td>输出维度</td><td>设置输出Layout</td><td>Channel对齐要求</td><td>H*W 对齐要求</td></tr><tr><td rowspan="9" colspan="2">RK3588 int8</td><td rowspan="9">4维度</td><td>NCHW</td><td>无</td><td>无</td></tr><tr><td>NHWC</td><td>16对齐</td><td>无</td></tr><tr><td>NC1HWC2</td><td>最后一层卷积类算子,32对齐,最后一层非卷积类算子16对齐</td><td>H*W要4对齐</td></tr><tr><td>UNDEFINE</td><td>无</td><td>无</td></tr><tr><td>NCHW</td><td>无</td><td>无</td></tr><tr><td>NHWC</td><td>8对齐</td><td>无</td></tr><tr><td>NC1HWC2</td><td>最后一层卷积类算子,16对齐,最后一层非卷积类算子8对齐</td><td>H*W要4对齐</td></tr><tr><td>UNDEFINE</td><td>无</td><td>无</td></tr><tr><td>UNDEFINE</td><td>无</td><td>无</td></tr></table>

## RV1103/RV1106

<table><tr><td>芯片平台</td><td>模型输出精度类型</td><td>输出维度</td><td>设置输出Layout</td><td>Channel对齐要求</td><td>H*W 对齐要求</td></tr><tr><td rowspan="2">RV1103/RV1106</td><td rowspan="2">int8</td><td rowspan="2">4维度</td><td>NC1HWC2</td><td>最后一层卷积类算子,32对齐,最后一层非卷积类算子16对齐</td><td>H*W要4对齐</td></tr><tr><td>NHWC</td><td>无</td><td>无</td></tr></table>

## RK3562

<table><tr><td>芯片平台</td><td>模型输出精度类型</td><td>输出维度</td><td>设置输出Layout</td><td>Channel对齐要求</td><td>H*W 对齐要求</td></tr><tr><td rowspan="9">RK3562</td><td rowspan="3">int8</td><td rowspan="8">4维度</td><td>NCHW</td><td>无</td><td>无</td></tr><tr><td>NHWC</td><td>无</td><td>无</td></tr><tr><td>NC1HWC2</td><td>最后一层卷积类算子,32对齐,最后一层非卷积类算子16对齐</td><td>H*W 要4对齐</td></tr><tr><td rowspan="5">float16</td><td>UNDEFINE</td><td>无</td><td>无</td></tr><tr><td>NCHW</td><td>无</td><td>无</td></tr><tr><td>NHWC</td><td>无</td><td>无</td></tr><tr><td>NC1HWC2</td><td>最后一层卷积类算子,16对齐,最后一层非卷积类算子8对齐</td><td>H*W 要4对齐</td></tr><tr><td>UNDEFINE</td><td>无</td><td>无</td></tr><tr><td>无限制</td><td>非 4维度</td><td>UNDEFINE</td><td>无</td><td>无</td></tr></table>

## RK3576/RV1126B

<table><tr><td>芯片平台</td><td>模型输出精度类型</td><td>输出维度</td><td>设置输出Layout</td><td>Channel 对齐要求</td><td>H*W 对齐要求</td></tr><tr><td rowspan="9">RK3576/RV1126B</td><td rowspan="4">int8</td><td rowspan="8">4维度</td><td>NCHW</td><td>无</td><td>无</td></tr><tr><td>NHWC</td><td>无</td><td>无</td></tr><tr><td>NC1HWC2</td><td>最后一层卷积类算子,32 对齐,最后一层非卷积类算子 16 对齐</td><td>H*W 要4 对齐</td></tr><tr><td>UNDEFINE</td><td>无</td><td>无</td></tr><tr><td rowspan="4">float16</td><td>NCHW</td><td>无</td><td>无</td></tr><tr><td>NHWC</td><td>无</td><td>无</td></tr><tr><td>NC1HWC2</td><td>最后一层卷积类算子,16 对齐,最后一层非卷积类算子 8 对齐</td><td>H*W 要4 对齐</td></tr><tr><td>UNDEFINE</td><td>无</td><td>无</td></tr><tr><td>无限制</td><td>非 4维度</td><td>UNDEFINE</td><td>无</td><td>无</td></tr></table>

## RK2118

<table><tr><td>芯片平台</td><td>模型输出精度类型</td><td>输出维度</td><td>设置输出Layout</td><td>Channel 对齐要求</td><td>H*W 对齐要求</td></tr><tr><td rowspan="3" colspan="2">RK2118 float16</td><td rowspan="2">4维度</td><td>NC1HWC2</td><td>最后一层卷积类算子,8对齐,最后一层非卷积类算子4对齐</td><td>H*W 要 4对齐</td></tr><tr><td>NHWC</td><td>无</td><td>无</td></tr><tr><td>非 4维度</td><td>UNDEFINE</td><td>无</td><td>无</td></tr></table>

372

<!-- page 373 of 374 -->

## RV1103B/RV1106B

<table><tr><td>芯片平台</td><td>模型输出精度类型</td><td>输出维度</td><td>设置输出Layout</td><td>Channel对齐要求</td><td>H*W对齐要求</td></tr><tr><td rowspan="2">RV1103B/RV1106B</td><td rowspan="2">int8</td><td rowspan="2">4维度</td><td>NC1HWC2</td><td>最后一层卷积类算子,8对齐,最后一层非卷积类算子8对齐</td><td>H*W要4对齐</td></tr><tr><td>NHWC</td><td>无</td><td>无</td></tr></table>

373

<!-- page 374 of 374 -->

## 特殊说明

## dilated\_kernel\_h

dilated\_kernel\_h = kernel\_h \* dilations\_h - dilations\_h + 1

## dilated\_kernel\_w

dilated\_kernel\_w = kernel\_w \* dilations\_w - dilations\_w + 1

374