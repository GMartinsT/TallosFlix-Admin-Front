<template>
  <div class="comment-popup">
    <div class="popup-content">
      <div class="popup-header">
        <h3 class="popup-label">{{ popupTitle }}</h3>
      </div>
      <div class="popup-body">
        {{ popupText }}
      </div>
      <div class="popup-footer">
        <button @click="closePopup">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    popupTitle: String,
    popupText: String,
    closePopup: Function,
  },
};
</script>

<style scoped>
.comment-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 80%;
  margin-left: 16.2rem;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  max-width: 80%;
  overflow: hidden;
}

.popup-header {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.popup-body {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 4px;
  padding: 0.5rem;
  background-color: #ebebeb;
}

.popup-footer {
  text-align: center;
  margin-top: 10px;
}

.popup-footer button {
  color: #f1f1f1;
  border: 2px solid #525156;
  background-color: #525156;
  border-radius: 4px;
  font-weight: bold;
}

.popup-footer button:hover {
  color: #f1f1f1;
  border: 2px solid #464646;
  background-color: #464646;
  border-radius: 4px;
  font-weight: bold;
  transform: scale(1.05);
}
</style>
