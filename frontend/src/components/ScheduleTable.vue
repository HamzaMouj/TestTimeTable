<template>
  <div class="schedule">
    <table>
      <thead>
        <tr>
          <th>Person</th>
          <th :data-day="day.name" v-for="day in days" :key="day.name">{{ day.name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr :data-person-id="person.id" v-for="person in people" :key="person.id">
          <td class="person-name">{{ person.name }}</td>
          <td v-for="day in days" :key="day.name" :data-day="day.name" class="day-cell">
            <div v-if="day.name !== 'Sat' && day.name !== 'Sun'" @click="startDrag(person, day)" class="add-block" :class="{ disabled: getBlocksForDay(person.id, day.name).length > 0 }">
              
            </div>
            <draggable
              v-for="block in getBlocksForDay(person.id, day.name)"
              :key="block.id"
              class="block-container"
              :block="block"
              @dragend="onDragEnd"
              @update-block-width="updateBlockWidth" 
            >
              <div class="block" :style="{ backgroundColor: block.color }">
                {{ block.name }}
              </div>
            </draggable>
            <button class="delete-button" :key="block.id" v-for="block in getBlocksForDay(person.id, day.name)" @click.stop="deleteBlock(block.id)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <delete-popup v-if="showDeletePopup" :blockId="blockToDelete" @close="cancelDelete" @delete="confirmDelete" />
    <schedule-popup v-if="showPopup" @close="showPopup = false" @save="createBlock" :day="newBlockDay.name" :personId="newBlockPerson.id" />
    <div class="info-box">
  <i class="fas fa-info-circle"></i>
  <span>If you drag your block on Saturday or Sunday, or outside the table, it'll count as a delete request.</span>
</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import SchedulePopup from './SchedulePopup.vue';
import Draggable from './DraggableSection.vue';
import DeletePopup from './DeletePopup.vue'; 
import axios from 'axios';

export default defineComponent({
  components: {
    SchedulePopup,
    Draggable,
    DeletePopup, 
  },
  data() {
    return {
      days: [
        { full: 'Monday', name: 'Mon' },
        { full: 'Tuesday', name: 'Tue' },
        { full: 'Wednesday', name: 'Wed' },
        { full: 'Thursday', name: 'Thu' },
        { full: 'Friday', name: 'Fri' },
        { full: 'Saturday', name: 'Sat' },
        { full: 'Sunday', name: 'Sun' }
      ],
      people: [
        { id: 1, name: 'Anton' },
        { id: 2, name: 'Oleg' },
        { id: 3, name: 'Ivan' },
        { id: 4, name: 'Petr' }
      ],
      scheduleBlocks: [],
      showPopup: false,
      newBlockPerson: null,
      newBlockDay: null,
      showDeletePopup: false,
      blockToDelete: null,
      block: {
        width: 100 
      }
    };
  },
  methods: {
    getBlocksForDay(personId, day) {
      return this.scheduleBlocks.filter(block => block.personId === personId && block.day === day);
    },
    startDrag(person, day) {
    if (this.getBlocksForDay(person.id, day.name).length > 0) {
      return;
    }
    this.newBlockPerson = person;
    this.newBlockDay = day;
    this.showPopup = true;
  },
    createBlock(newBlock) {
      axios.post('http://localhost:3000/schedule', newBlock)
        .then(response => {
          this.scheduleBlocks.push(response.data);
          this.showPopup = false;
          this.fetchSchedule();
        })
        .catch(error => {
          console.error('Error creating block:', error);
        });
    },
    async onDragEnd({ block, newDay, newPersonId }) {
      if (newDay && newPersonId) {
        block.day = newDay;
        block.personId = newPersonId;

        try {
          const response = await axios.put(`http://localhost:3000/schedule/${block.id}`, block);
          this.fetchSchedule(); 
          console.log(response)
      
        } catch (error) {
          console.error('Error updating block:', error);
        }
      } else {
        this.deleteBlock(block.id);
      }
    },
    async onResizeEnd({ block, width }) {
    block.width = width;

    const cellWidth = 100; // Adjust this value to match the actual cell width
    const numberOfDays = Math.ceil(block.width / cellWidth);

    const initialDayIndex = this.days.findIndex(day => Array.isArray(block.day) ? block.day[0] : block.day === day.name);
    const newDays = this.days.slice(initialDayIndex, initialDayIndex + numberOfDays).map(day => day.name);

    block.day = newDays.length === 1 ? newDays[0] : newDays;

    try {
      const response = await axios.put(`http://localhost:3000/schedule/${block.id}`, block);
      console.log('Block updated successfully:', response.data);
      this.fetchSchedule(); // Refresh the schedule
    } catch (error) {
      console.error('Error updating block:', error);
    }
  },
    deleteBlock(blockId) {
      this.blockToDelete = blockId;
      this.showDeletePopup = true;
    },
    async confirmDelete(blockId) {
      try {
        await axios.delete(`http://localhost:3000/schedule/${blockId}`);
        this.scheduleBlocks = this.scheduleBlocks.filter(block => block.id !== blockId);
        this.showDeletePopup = false;
        this.blockToDelete = null;
        this.fetchSchedule(); 
      } catch (error) {
        console.error('Error deleting block:', error);
      }
    },
    updateBlockWidth(newWidth) {
      this.block.width = newWidth;
    },
    cancelDelete() {
      this.showDeletePopup = false;
      this.blockToDelete = null;
    },
    fetchSchedule() {
      axios.get('http://localhost:3000/schedule')
        .then(response => {
          this.scheduleBlocks = response.data;
        })
        .catch(error => {
          console.error('Error fetching schedule:', error);
        });
    },
  },
  created() {
    this.fetchSchedule();
  },
});
</script>

<style>
.schedule {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  border-collapse: collapse;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  text-align: center;
  padding: 25px;
  width: 280px;
  height: 60px;
  position: relative;
  vertical-align: middle;
}

th {
  background-color: #f8f8f8;
  font-weight: bold;
  color: #333;
}

.block-container {
  position: relative;
}

.block {
  color: white;
  padding: 20px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 4px;
  width: 140px;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.block:hover {
  background-color: #6d836e;
}

.add-block {
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.delete-button {
  position: absolute;
  bottom: 5px;
  right: 5px;
  padding: 5px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.block button:hover {
  background-color: darkred;
}

.add-block:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.disabled {
  background-color: #ffffff;
  pointer-events: none;
}

.popup button {
  padding: 12px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.info-box {
  display: flex;
  align-items: center;
  background-color: #e7f3fe;
  color: #31708f;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-box i {
  margin-right: 10px;
  font-size: 20px;
}

.info-box span {
  flex: 1;
  line-height: 1.5;
}
</style>
