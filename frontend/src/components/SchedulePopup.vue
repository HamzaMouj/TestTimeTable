<template>
  <div class="popup-overlay" @click="$emit('close')">
    <div class="popup" @click.stop>
      <form @submit.prevent="save">
        <h2>Edit Block</h2>
        <div class="inputs">
          <input v-model="name" placeholder="Block Name" required />
          <input class="color-picker" v-model="color" type="color" placeholder="Color" required />
        </div>
        <div class="buttons">
          <button type="submit" class="save-button">Save</button>
          <button type="button" @click.prevent="$emit('close')" class="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    day: String,
    personId: Number,
  },
  data() {
    return {
      name: '',
      color: '#ff0000',
    };
  },
  methods: {
    save() {
      const newBlock = {
        name: this.name,
        color: this.color,
        day: this.day,
        personId: this.personId,
      };
      this.$emit('save', newBlock);
    },
  },
};
</script>

<style>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px); /* Blurs everything behind the popup */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

/* Popup styling */
.popup {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  animation: fadeIn 0.3s ease-in-out;
}

/* Popup form styling */
.popup form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.popup h2 {
  margin: 0 0 10px;
  font-size: 20px;
  text-align: center;
}

.popup input {
  padding: 12px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.popup .buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.popup button {
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  flex: 1;
}

.save-button {
  background-color: #4caf50;
  color: white;
}

.save-button:hover {
  background-color: #45a049;
}

.cancel-button {
  background-color: #f44336;
  color: white;
}

.cancel-button:hover {
  background-color: #e53935;
}

.inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.color-picker {
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.color-picker:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.color-picker:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

/* Popup fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

</style>
