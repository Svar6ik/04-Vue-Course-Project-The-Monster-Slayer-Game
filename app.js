function getRandomValue(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,  
      currentRound: 0,
      healRound: 0,
      healbtn: false,
      winner: null,
      logMessages: []
    };  
  },
  watch: {
    playerHealth(value) { // 
      if (value < 0 & this.monsterHealth < 0) {
        // Draw!
        this.winner = 'draw';
      } else if (value <= 0) {
        // You lost!
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (this.playerHealth < 0 & value < 0) {
        // Draw!
        this.winner = 'draw';
      } else if (value <= 0) {
        // You won!
        this.winner = 'player';
      }
    } 
  },
  computed: {
    mosterBarStyles() {
      if (this.monsterHealth < 0) {
        return {width: '0%' };
      }
      return {width: this.monsterHealth + '%'};  
    },  
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return {width: '0%' };
      }
      return {width: this.playerHealth + '%'};  
    },  
    mayUseSpicialAttack() { // button SPECIAL ATTACK доступен каждый 3-й раунд
      return this.currentRound % 3 !==0
    },
    mayHeal() { // ограничиваю Heal до 1-го раза за игру (от себятина)
      if (this.healRound >= 1) {
        return this.healbtn = true;
      }
    },
    
  },
  methods: {
    startGame() { // перезапуск игры
      this.monsterHealth = 100;
      this.playerHealth =  100; 
      this.currentRound =  0;
      this.healRound = 0;
      this.healbtn = false;
      this.winner = null;
      this.logMessages = [];
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue);
      this.attackPlayer();
    }, 
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;  
      this.addLogMessage('monster', 'attack', attackValue);
    },  
    specialAttack() { 
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue; 
      this.addLogMessage('player', 'special-attack', attackValue);
      this.attackPlayer(); 
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth += healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage('player', 'heal', healValue);
      this.attackPlayer();
      this.healRound++;
    },
    surrender() {
      this.winner = 'monster'
    },
    addLogMessage(who, what, value) { // Battle log 
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value
      });
    }
  }  
});

app.mount('#game');