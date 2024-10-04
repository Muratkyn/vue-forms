<template>
  <div class="container">
    <div>
      <h1>Barriere Architettoniche - Sif 75%</h1>
      <hr />
      <p>
        Compila il form per accedere al percorso Barriere Architettoniche - Sif
        75%.
        <br />
        Inserisci le informazioni richieste e gli allegati necessari all'analisi
        della tua richiesta.
      </p>
      <p>Riferimento Ordine</p>

      <div class="table-container">
        <div v-for="field in customerData" class="firstItem-wrapper">
          <label :for="field.name"
            >{{ field.label }}
            <span> - obbligatorio</span>
          </label>
          <input
            type="text"
            class="input-field"
            v-model="data[field.name as keyof Data]"
          />
        </div>
      </div>
      <p>Tipo di richiesta</p>
      <div class="table-container">
        <div class="secondItem-wrapper">
          <label :for="requestType.name1"
            >{{ requestType.label1 }}
            <span> - obbligatorio</span>
          </label>
          <select
            @change="handleSelectChange(data.requestType)"
            :name="requestType.label1"
            :id="requestType.name1"
            class="input-field"
            v-model="data.requestType"
          >
            <option
              v-for="item in requestType.selections"
              :value="item.name"
              :key="item.name"
            >
              {{ item.label }}
            </option>
          </select>
          <label :for="requestType.label2"
            >{{ requestType.label2 }}
            <span> - obbligatorio</span>
          </label>
          <select
            :name="requestType.label2"
            :id="requestType.name2"
            class="input-field"
            v-model="data.requestSpecific"
          >
            <option
              v-for="option in options"
              :value="option.value"
              :key="option.name"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { customerData } from "@/constants";
import { requestType } from "@/constants";
import { ref, watch } from "vue";

type Data = {
  customerName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string;
  customerNegozio: string;
  requestType: string;
  requestSpecific: string;
};

const handleSelectChange = (requestTypeName: string) => {
  options.value = requestType.selections.find(
    (el) => el.name === requestTypeName
  )!.options;
};

const data = ref<Data>({
  customerName: "",
  customerLastName: "",
  customerEmail: "",
  customerPhone: "",
  customerNegozio: "",
  requestType: "",
  requestSpecific: "",
});

const options = ref<{ name: string; label: string; value: number }[]>([]);

watch(data.value, (newVal, oldVal) => console.log(newVal));
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4rem auto;
  box-sizing: border-box;
}

h1 {
  font-size: 2.125rem;
}
hr {
  width: 70px;
  height: 0.2rem;
  background-color: #46a610;
  margin: 0;
}
p {
  font-size: 1.2rem;
  display: block;
}

@media screen and (min-width: 1024px) {
  #app h1 {
    font-size: 2.5rem;
    line-height: 1.36;
  }
}
.table-container {
  display: flex;
  flex-flow: row wrap;
  gap: 1.5rem;
}

.firstItem-wrapper {
  display: flex;
  flex-direction: column;
  flex-basis: 45%;
}

.firstItem-wrapper:last-child {
  flex-basis: 92%;
}

@media screen and (max-width: 768px) {
  .firstItem-wrapper {
    flex-basis: 95%;
  }
  .firstItem-wrapper:last-child {
    flex-basis: 95%;
  }
}

.secondItem-wrapper {
  display: flex;
  flex-direction: column;
  flex-basis: 45%;
}

@media screen and (max-width: 768px) {
  .secondItem-wrapper {
    flex-basis: 95%;
  }
  .secondItem-wrapper:last-child {
    flex-basis: 95%;
  }
}
.input-field {
  padding: 1rem;
  margin: 4px;
  border-radius: 4px;
  border-style: none;
  border: rgb(59, 58, 58) solid 1px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  transition: 0.3s ease;
  background-color: white;
}

.input-field:focus {
  outline: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

label {
  margin-left: 0.2rem;
}
span {
  font-size: 0.75rem;
  color: #666;
}
</style>
