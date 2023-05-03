https://www.youtube.com/watch?v=t934FOlOMoM

https://www.youtube.com/watch?v=7nwpEiSpPqY

# 1. Recoil

```js
// QuizAtom
import { atom } from 'recoil'

export default atom({
  key: 'Difficulty', // 전체 아톰과 셀렉터에 대해서 "유니크"한 값
  default: 'normal', // default 값
})
```

```js
import { useRecoilState } from 'recoil'
import { DifficultyState } from './state/DifficultyAtom'

const SelectDifficulty = () => {
  const [difficulty, setDifficulty] = useRecoilState(DifficultyState)

  const handleChange = (e: ChangeEvent<HTMLSelectElemnt>) => {
    setQuizDifficulty(e.target.value)
  }

  return (
    <select vlaue={difficulty} onChange={handleChange}>
      <option value="easy">easy</option>
      <option value="normal">normal</option>
      <option value="hard">hard</options>
    </select>
  )
}
```

# 2. Recoil 2

selector

1. 이미 선언된 아톰을 구독하고 있다가 함수를 실행
2. 서버와의 비동기적인 통신이 가능

비동기 suspense, loadble 알아보기
recoil은 데이터를 캐싱함!!!

1. 구독중인 state가 변경
2. 요청 파라미터가 새로운 값으로 바뀐경우 (파라미터를 하나 더 만들고
3. https://www.youtube.com/watch?v=7nwpEiSpPqY)
4. 19:50

5. 내 이벤트는 명시적 업데이트
6. 아닌 것은 실시간/주기적 업데이트 : 시간 같은 것을 파라미터를 줌.

이제는 캐싱을 안하는 법이 나온 것 같음. 알아보기
