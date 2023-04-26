Prop drilling -> prop이 필요 없음에도 내려주기 위해 사용해야함

Context를 가진 상위 컴포넌트 -> 여러 하위 커포넌트 데이터
context로 데이터 공유. udseContext사용
단점: 재사용성이 어려워짐
단순히 prop drilling을 피하기 위해서라면 component 합성

context = createContext(null)
초깃값은 Provider로 제공하지 않을 경우 쓰임

<context.provider value={전달하고자 하는 값}>
<app></app>
</context.provider>

app
data = useContext(context) // context의 모든 값을 가져옴

cra
https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/
