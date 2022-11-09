```jsx harmony
import { Button } from '@skbkontur/react-ui';

const [isActive, setIsActive] = React.useState(true);

<>
  <Button onClick={() => setIsActive(!isActive)}>{isActive ? 'Остановить загрузку' : 'Продолжить загрузку'}</Button>
  <Loader type="big" active={isActive}>
    <h1>Yeah, and if you were the pope they'd be all, "Straighten your pope hat." And "Put on your good vestments."</h1>
    <p>
      No, I'm Santa Claus! I guess if you want children beaten, you have to do it yourself. We're also Santa Claus! Leela,
      Bender, we're going grave robbing.
    </p>
    <p>
      Are you crazy? I can't swallow that. Large bet on myself in round one. Hey, whatcha watching?
      <strong> Moving along… I guess if you want children beaten, you have to do it yourself.</strong>
      <em>It's okay, Bender.</em> I like cooking too.
    </p>
    <h2>Oh, I think we should just stay friends.</h2>
    <p>
      No argument here. And when we woke up, we had these bodies. You guys go on without me! I'm going to go… look for
      more stuff to steal! Oh, how awful. Did he at least die painlessly? …To shreds, you say. Well, how is his wife
      holding up? …To shreds, you say.
    </p>
    <ol>
      <li>No! The kind with looting and maybe starting a few fires!</li>
      <li>You are the last hope of the universe.</li>
      <li>Hey, guess what you're accessories to.</li>
    </ol>
  </Loader>
</>
```
