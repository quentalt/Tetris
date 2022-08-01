export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT),() =>  Array(STAGE_WIDTH).fill([0,'clear']));
    

export const checkCollison =  (player,stage, {x: moveX,y:moveY}) => {
    
    for(let y =0; y < player.tetromino.length; y +=1) {
        for(let x = 0; x < player.tetromino[y].length; x +=1) {
                // 1. Vérifier que nous sommes dans l'actuel cellule du tetromino
       if(player.tetromino[y][x] !== 0) {
      
           if(
                 //2. Vérifier que notre mouvement est dans la hauteur du terrain
               !stage[y + player.pos.y + moveY] ||
                // 3. Vérifier que notre coup est à l'intérieur de la largeur des zones de jeu (x)    
               !stage[y + player.pos.y + moveY][x+ player.pos.x + moveX] ||
               //4. Vérifier que la cellule vers laquelle vous vous dirigez n'est pas définie sur Clear
               stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 
               'clear'
           ) {
               return true;
           }
       }
        }
    }
    return false;
};
