<template>
  <div class="popup">
    <form @submit.prevent="save">
    <div class="inputs">
      <input v-model="name" placeholder="Block Name" required />
      <input class="color-picker" v-model="color" type="color" placeholder="Color" required />
    </div>
      <button type="submit">Save</button>
      <button @click.prevent="$emit('close')">Cancel</button>
    </form>
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
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.popup form {
  display: flex;
  flex-direction: column;
  gap:8px;
}

.popup input {
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.popup button {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  width: 100%;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.popup button:hover {
  background-color: #45a049;
}
.inputs{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.color-picker {
  width: 50px;
  height: 50px;
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

</style>
