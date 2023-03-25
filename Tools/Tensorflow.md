# Tensorflow <!-- omit from toc -->

# 1. 설치

# 2.ipykernel

ipykernel은 IPython 커널을 제공하는 파이썬 패키지입니다. IPython은 개발자들이 보다 효율적으로 코드를 작성하고 디버깅하는 데 도움이 되는 다양한 기능을 제공하는 대화형 쉘입니다. 이 쉘에서 파이썬 코드를 실행할 때, 해당 코드가 IPython 커널에서 실행됩니다.

ipykernel은 IPython 커널을 Jupyter 노트북, JupyterLab 및 기타 IPython 기반 도구에서 사용할 수 있도록 만들어진 모듈입니다. 이를 통해 브라우저에서 실행되는 대화형 노트북 환경에서 파이썬 코드를 실행하고 결과를 확인할 수 있습니다.

또한, ipykernel은 다양한 언어의 커널도 지원합니다. 예를 들어, R 언어, Julia 등 다양한 언어의 커널을 사용하여 Jupyter 노트북에서 해당 언어의 코드를 실행할 수 있습니다.

대화형 커널(IPython kernel 또는 Jupyter kernel)은 운영체제의 커널과는 다른 개념입니다.

운영체제의 커널은 컴퓨터 시스템의 핵심으로서, 시스템 자원(메모리, 프로세서, 입출력 등)을 관리하고 응용 프로그램의 실행을 제어합니다.

반면에 대화형 커널은 대화형 개발 도구에서 코드 실행을 담당하는 역할을 합니다. IPython kernel과 Jupyter kernel은 Python과 R과 같은 프로그래밍 언어의 코드를 실행하고 그 결과를 반환하는 역할을 합니다.

따라서, 대화형 커널은 운영체제의 커널과는 별개의 개념이며, 대화형 개발 도구에서 코드 실행을 담당하는 중요한 요소 중 하나입니다

# 3. Anaconda

Anaconda는 데이터 과학 및 기계 학습을 위한 오픈 소스 배포판입니다. 파이썬과 R 등의 프로그래밍 언어, 데이터 과학 도구 및 라이브러리, 그리고 개발을 위한 다양한 도구와 IDE(통합 개발 환경)을 포함하고 있습니다.

Anaconda는 데이터 분석 및 기계 학습을 위한 다양한 패키지와 라이브러리를 포함하고 있으며, 이를 통해 빠르고 쉽게 데이터 과학 프로젝트를 시작할 수 있습니다. 또한, Anaconda는 파이썬 패키지 관리자인 conda를 포함하고 있으며, 이를 통해 다양한 패키지의 설치와 관리를 용이하게 할 수 있습니다.

Anaconda는 무료이며, Windows, macOS, Linux와 같은 다양한 운영 체제에서 사용할 수 있습니다. 또한, Anaconda Navigator와 같은 사용자 친화적인 GUI(그래픽 사용자 인터페이스)도 제공되어, 쉽고 편리하게 Anaconda 환경을 관리할 수 있습니다.

네, Anaconda는 ipykernel을 포함하고 있습니다. Anaconda 배포판에는 Jupyter Notebook과 JupyterLab과 같은 대화형 개발 도구가 포함되어 있으며, 이들은 ipykernel을 사용하여 대화형 커널을 제공합니다.

Anaconda에서 파이썬 가상 환경을 생성하면, 각 환경에는 별도의 Python 인터프리터 및 라이브러리 집합이 포함됩니다. 이 때, 각 가상 환경에는 자체적인 ipykernel이 있습니다. 따라서, Anaconda를 사용하여 Jupyter Notebook 및 JupyterLab과 같은 대화형 개발 도구를 실행할 때, 이들은 각각의 가상 환경에 대한 ipykernel을 사용합니다.

따라서, Anaconda를 사용하면 손쉽게 파이썬 가상 환경과 함께 ipykernel을 사용할 수 있으며, 이를 통해 Jupyter Notebook 및 JupyterLab과 같은 대화형 개발 도구에서 파이썬 코드를 실행하고 결과를 확인할 수 있습니다.

# 4. CUDA toolkit

가상환경

```
conda create -n {가상환경 이름} python=3.9

conda activate {가상환경 이름}
source activate {가상환경 이름}

conda install tensorflow-gpu
```

```
nvidia-smi

import os
os.environ["CUDA_VISIBLE_DEVICES"] = "2"

```

맞습니다. CUDA Toolkit은 NVIDIA 그래픽 카드에서 병렬 처리를 수행하는 데 사용되는 프로그래밍 모델인 CUDA를 지원하며, TensorFlow와 같은 머신 러닝 프레임워크에서 GPU를 사용하여 모델을 빠르게 학습하고 실행할 수 있도록 돕습니다.

TensorFlow는 GPU를 사용하여 모델의 계산을 가속화하는 TensorFlow-GPU 패키지를 제공합니다. 이 패키지는 CUDA Toolkit과 cuDNN(Deep Neural Network 라이브러리)을 기반으로 구성되어 있으며, NVIDIA 그래픽 카드에서 TensorFlow 모델을 실행할 수 있도록 지원합니다.

따라서, CUDA Toolkit은 TensorFlow와 같은 머신 러닝 프레임워크에서 GPU를 활용하여 모델의 학습과 실행을 가속화하는 데 중요한 역할을 합니다.

TensorFlow에서 CUDA Toolkit을 사용하기 위해서는 TensorFlow와 호환되는 CUDA 버전을 설치해야 합니다. 일반적으로 TensorFlow 설치 시 CUDA 및 cuDNN과 같은 GPU 지원 패키지가 함께 설치됩니다. 그러나 직접 설치해야 하는 경우 아래 단계를 따르면 됩니다.

CUDA Toolkit 설치: 먼저 NVIDIA의 공식 웹 사이트에서 호환되는 CUDA Toolkit을 다운로드하고 설치합니다. TensorFlow와 호환되는 CUDA 버전은 TensorFlow의 공식 문서를 참조하세요.

cuDNN 설치: NVIDIA cuDNN은 TensorFlow의 딥 러닝 모델에서 최적의 성능을 제공하는 중요한 라이브러리입니다. CUDA Toolkit과 마찬가지로, cuDNN도 NVIDIA의 공식 웹 사이트에서 다운로드할 수 있습니다. TensorFlow와 호환되는 cuDNN 버전은 TensorFlow의 공식 문서를 참조하세요.

TensorFlow 설치: 이제 CUDA Toolkit과 cuDNN이 설치된 환경에서 TensorFlow를 설치합니다. TensorFlow의 GPU 버전을 설치하면 TensorFlow는 CUDA 및 cuDNN을 자동으로 감지하여 GPU를 사용하도록 설정됩니다.

GPU 지원 확인: TensorFlow를 설치하고 나면 TensorFlow가 GPU를 인식하고 사용 가능한지 확인하는 것이 좋습니다. 예를 들어, 다음과 같은 코드를 실행하여 TensorFlow가 GPU를 인식하고 사용 가능한지 확인할 수 있습니다.

```
import tensorflow as tf
print("Num GPUs Available: ", len(tf.config.list_physical_devices('GPU')))
```

# 5. tensorflow

TensorFlow(텐서플로우)는 구글이 개발한 오픈 소스 머신 러닝 라이브러리입니다. TensorFlow는 딥 러닝 모델을 구성하고 학습시키기 위한 다양한 기능을 제공하며, 대규모 데이터를 처리하고 분석하는 데에도 유용합니다.

TensorFlow는 그래프 기반 계산 모델을 사용합니다. 그래프 기반 모델은 연산 노드(노드)와 데이터 노드(텐서)로 구성되며, 각 노드는 입력 데이터를 받아 연산을 수행한 후 출력 데이터를 생성합니다. TensorFlow는 이러한 그래프 기반 모델을 사용하여 딥 러닝 모델을 효과적으로 표현하고 학습시킵니다.

TensorFlow는 다양한 언어를 지원하며, 파이썬 API를 통해 간편하게 사용할 수 있습니다. TensorFlow를 사용하면 딥 러닝 모델의 개발과 학습 과정을 단순화할 수 있으며, 이미지 처리, 자연어 처리, 음성 인식 등 다양한 분야에서 활용됩니다.
