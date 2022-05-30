function getRandomValue(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,  
      currentRound: 0
    };  
  },
  computed: {
    mosterBarStyles() {
      return {width: this.monsterHealth + '%'};  
    },  
    playerBarStyles() {
      return {width: this.playerHealth + '%'};  
    },  
    mayUseSpicialAttack() { // button SPECIAL ATTACK доступен каждый 3-й раунд
      return this.currentRound % 3 !==0
    }
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    }, 
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;  
    },  
    specialAttack() { 
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue; 
      this.attackPlayer(); 
    }  
  }  
});

app.mount('#game');