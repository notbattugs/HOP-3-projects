import { useEffect, useState, useRef } from 'react';
import useInterval from 'use-interval';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const zoom = 20;
const areaWidth = 30;
const areaHeight = 30;

export default function Home() {
  const router = useRouter();
  const [body, setBody] = useState([
    { top: 1, left: 5 },
    { top: 2, left: 5 },
    // { top: 3, left: 5 },
    // { top: 4, left: 5 },
    // { top: 5, left: 5 },
    // { top: 6, left: 5 },
    // { top: 7, left: 5 },
    // { top: 8, left: 5 },
    // { top: 9, left: 5 },
    // { top: 10, left: 5 },
    // { top: 11, left: 5 },
    // { top: 12, left: 5 },
    // { top: 13, left: 5 },
    // { top: 14, left: 5 },
    // { top: 15, left: 5 },
    // { top: 16, left: 5 },
    // { top: 17, left: 5 },
    // { top: 18, left: 5 },
    // { top: 19, left: 5 },
    // { top: 20, left: 5 },
    // { top: 21, left: 5 },
    // { top: 22, left: 5 },
    // { top: 23, left: 5 },
    // { top: 24, left: 5 },
    // { top: 25, left: 5 },
    // { top: 26, left: 5 },
  ]);
  const [direction, setDirection] = useState('right');
  const [food, setFood] = useState({ top: 0, left: 5 });
  const [score, setScore] = useState(0);
  const [highScore, SetHighScore] = useState([{ score: 0 }]);
  console.log(highScore);
  function GameOver() {
    for (let i = 1; i < body.length; i++) {
      if (body[i].top === body[0].top && body[i].left === body[0].left) {
        Swal.fire({
          title: 'Error!',
          text: 'Game Over ~ You Lost HAHAHAHAHAHAHAHAHAHAH',
          icon: 'error',
          confirmButtonText: 'Cool',
        });
        router.reload();
        SetHighScore([...highScore, score]);
      }
    }
  }
  function highScoreFinder() {
    const [max, setMax] = useState(highScore[0]);
    for (let i = 1; i < highScore.length; i++) {
      if (highScore[i] > max) {
        setMax(highScore[i]);
      }
    }
    localStorage.setItem('highScore', `${max}`);
  }

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      setDirection((prevDirecation) => {
        switch (e.code) {
          case 'ArrowDown':
            if (prevDirecation !== 'up') {
              return 'down';
            }
            break;
          case 's':
            if (prevDirecation !== 'up') {
              return 'down';
            }
            break;
          case 'ArrowRight':
            if (prevDirecation !== 'left') {
              return 'right';
            }
            break;
          case 'd':
            if (prevDirecation !== 'left') {
              return 'right';
            }
            break;
          case 'ArrowUp':
            if (prevDirecation !== 'down') {
              return 'up';
            }
            break;
          case 'w':
            if (prevDirecation !== 'down') {
              return 'up';
            }
            break;
          case 'ArrowLeft':
            if (prevDirecation !== 'right') {
              return 'left';
            }
            break;
          case 'a':
            if (prevDirecation !== 'right') {
              return 'left';
            }
            break;
        }
        return prevDirecation;
      });
    });
  });
  function GenFood() {
    const top = Math.floor(Math.random() * areaHeight);
    const left = Math.floor(Math.random() * areaWidth);
    setFood({ top, left });
  }
  function goRight() {
    const newBody = [...body];

    newBody.pop();
    let newLeft = newBody[0].left + 1;
    if (newLeft > areaWidth - 1) {
      newLeft = 0;
    }
    newBody.unshift({ ...newBody[0], left: newLeft });
    setBody(newBody);
  }
  function goLeft() {
    const newBody = [...body];

    newBody.pop();
    let newLeft = newBody[0].left - 1;
    if (newLeft < 0) {
      newLeft = areaWidth - 1;
    }
    newBody.unshift({ ...newBody[0], left: newLeft });
    setBody(newBody);
  }
  function goDown() {
    const newBody = [...body];

    newBody.pop();
    let newTop = newBody[0].top + 1;
    if (newTop > areaHeight - 1) {
      newTop = 0;
    }
    newBody.unshift({ ...newBody[0], top: newTop });
    setBody(newBody);
  }

  function goUp() {
    const newBody = [...body];

    newBody.pop();
    let newTop = newBody[0].top - 1;
    if (newTop < 0) {
      newTop = areaHeight - 1;
    }
    newBody.unshift({ ...newBody[0], top: newTop });
    setBody(newBody);
  }
  useInterval(() => {
    switch (direction) {
      case 'right':
        goRight();
        break;
      case 'left':
        goLeft();
        break;
      case 'up':
        goUp();
        break;
      case 'down':
        goDown();
        break;
    }
    if (body[0].top === food.top && body[0].left === food.left) {
      GenFood();
      if (direction == 'up') {
        setBody([...body, { top: body[0].top + 1, left: body[0].left }]);
      }
      if (direction == 'down') {
        setBody([...body, { top: body[0].top - 1, left: body[0].left }]);
      }
      if (direction == 'right') {
        setBody([...body, { top: body[0].top, left: body[0].left + 1 }]);
      }
      if (direction == 'left') {
        setBody([...body, { top: body[0].top, left: body[0].left - 1 }]);
      }
      setScore(score + 1);
    }
    GameOver();
  }, 100);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 bg-slate-200`}
    >
      <div className="w-[400px] flex justify-around items-between">
        <p className="text-black"> Оноо : {score}</p>
        <p className="text-black">Дээд оноo : </p>
      </div>
      <div
        className="relative bg-slate-300 "
        style={{ width: areaWidth * zoom, height: areaHeight * zoom }}
      >
        <img
          src="https://clipart-library.com/img/1565435.png"
          alt=""
          className="absolute rounded bg-black-700"
          style={{
            top: food.top * zoom,
            left: food.left * zoom,
            width: zoom,
            height: zoom,
          }}
        />
        {/* <div
          className="absolute rounded bg-red-700"
          style={{
            top: food.top * zoom,
            left: food.left * zoom,
            width: zoom,
            height: zoom,
          }}
        ></div> */}
        {body.map((segment, index) => (
          <div
            className="absolute rounded-s bg-green-700"
            style={{
              top: segment.top * zoom,
              left: segment.left * zoom,
              width: zoom,
              height: zoom,
              // backgroundImage: `url('${segment.img}')`,
              // backgroundPosition: 'center',
              // backgroundRepeat: 'no-repeat',
            }}
            key={index}
          ></div>
        ))}
      </div>
    </main>
  );
}
