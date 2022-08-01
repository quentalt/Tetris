import React, {useState} from 'react';


import {createStage, checkCollison} from "../gameHelpers";

//Composants
import Stage from './Stage';
import Display from "./Display";
import StartButton from "./StartButton";

//Composants Styled
import {StyledTetrisWrapper,StyledTetris} from "../styles/StyledTetris";

//Hooks
import {useInterval} from '../hooks/useInterval'
import {usePlayer} from "../hooks/usePlayer";
import {useStage} from "../hooks/useStage";
import {useGameStatus} from "../hooks/useGameStatus";

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver,setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage,setStage, rowsCleared] = useStage(player,resetPlayer);
    const [score,setScore,rows,setRows,level,setLevel] = useGameStatus(rowsCleared);

    console.log('re-render');

    const movePlayer = dir => {
        if(!checkCollison(player,stage,{x:dir,y:0})) {
            updatePlayerPos({x:dir,y:0})
        }
    };

    const keyUp = ({keyCode}) => {
        if(!gameOver) {
            if(keyCode === 40) {
                console.log('interval on');
                setDropTime(1000+(level +1) + 200);
            }
        }
    };

    const startGame = () => {
        //Reset
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    };
    const drop = () => {
        //Augmente le niveau quand le joueur fini les 10 lignes

        if(rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            //Augmente la vitesse
            setDropTime(1000+(level +1) + 200);
        }

        if(!checkCollison(player,stage,{x:0,y:1})) {
            updatePlayerPos({x:0,y:1, collided:false});
        } else {
            //Game Over
            if(player.pos.y < 1) {
                console.log("GAME OVER");
                setGameOver(true);
                setDropTime(null);
            }
         updatePlayerPos({x:0,y:0,collided: true});
        }
    };

    const dropPlayer = () => {
        setDropTime(null);
    drop();
    };
  
    useInterval(() => {
        drop();
    },dropTime);
  

//Déplacements du tetromino

    const move = ({keyCode}) => {
    if(!gameOver) {
        if(keyCode ===37) {
        movePlayer(-1);
        } else if (keyCode === 39) {
            movePlayer(1);
        } else if (keyCode === 40) {
            dropPlayer();
        } else if (keyCode === 38) {
            playerRotate(stage,1)
        }
    }
    };

     return (
        <StyledTetrisWrapper
            role="button"
            tabIndex="0"
            onKeyDown={e => move(e)}
            onKeyUp={keyUp}
        >

            <StyledTetris>
            <Stage stage={stage}/>
            <aside>
                {gameOver ? (
                    <Display gameOver={gameOver} text="Game Over"/>
                ) : (
                <div>
                <Display text={`Score: ${score}`}/>
                <Display text={`Rows: ${rows}`} />
                <Display text={`Level: ${level}`}/>
                </div>
                    )}
                <StartButton callback={startGame}/>
            </aside>
            </StyledTetris>
    </StyledTetrisWrapper>
    );
};

export default Tetris;
