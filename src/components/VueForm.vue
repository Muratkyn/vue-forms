<template>
  <div class="container">
    <div class="container-wrapper">
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
      <div class="table-container2">
        <div class="secondItem-wrapper">
          <label :for="requestType.name1"
            >{{ requestType.label1 }}
            <span> - obbligatorio</span>
          </label>
          <select
            @change="handleSelectChange(data.requestType)"
            :name="requestType.label1"
            :id="requestType.name1"
            class="input-field__request"
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
            class="input-field__request"
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
          <div class="upload-container">
            <label
              >Titolo Abilitativo
              <span> - obbligatorio</span>
              <p class="text-info">
                Allega la CILA/SCIA aperta presso il tuo comune entro il
                29/12/2023. Formati accettati: PDF, JPG, PNG. Dimensione massima
                6MB.
              </p>
            </label>
            <button class="upload-button" @click="uploadDocument">
              Seleziona uno o più file da caricare
            </button>
            <input
              ref="fileInput"
              type="file"
              id="getFile"
              style="display: none"
              multiple
              @change="(event) => handleFileUpload(event)"
            />
            <div v-for="image in data.customerImage">
              <p>{{ image.name }}</p>
              <button></button>
            </div>
            <div class="condition-input">
              <input type="checkbox" />
              <p>
                Per inviare la richiesta conferma di aver letto
                <a
                  href="https://www.leroymerlin.it/leroy-merlin-privacy-policy.html"
                >
                  sensi del Regolamento Generale sulla Protezione dei dati (UE)
                  2016/679* l'Informativa ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="send-request">
        <button class="request-button">Invia richiesta</button>
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
  customerImage: File[];
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
  customerImage: [] as File[],
});

const fileInput = ref<HTMLInputElement>();

const uploadDocument = () => {
  fileInput.value!.click();
};

const handleFileUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (!files) return;
  const selectedFiles = Array.from(files);
  data.value.customerImage.push(...selectedFiles);
};
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
  max-width: 100%;
  overflow-x: hidden;
}
.container-wrapper {
  display: flex;
  flex-flow: column;
  margin-left: 8%;
  max-width: 100%;
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
}
.table-container2 {
  display: flex;
  flex-flow: row wrap;
}
.firstItem-wrapper {
  display: flex;
  flex-direction: column;
  flex-basis: 45%;
}

.firstItem-wrapper:last-child {
  flex-basis: 90%;
}

@media screen and (max-width: 768px) {
  .firstItem-wrapper,
  .secondItem-wrapper {
    flex-basis: 90%;
    margin-right: 0;
  }

  #app button {
    width: auto;
  }

  .upload-button {
    width: auto;
  }

  .secondItem-wrapper {
    flex-basis: 80%;
  }
}

.secondItem-wrapper {
  display: flex;
  flex-direction: column;
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
  margin-right: 1rem;
}

.input-field:focus {
  outline: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.text-info {
  font-size: small;
  font-size: 0.75rem;
  color: #666;
  margin-left: 3px;
}
label {
  margin-left: 0.2rem;
}
span {
  font-size: 0.75rem;
  color: #666;
}

.upload-container {
  margin-top: 5%;
}

.request-inputs {
  display: flex;
  justify-content: center;
  flex-flow: column wrap;
  width: 1000px;
}
.upload-button {
  font-weight: 600;
  font-size: 0.85rem;
  display: flex;
  width: 300px;
  height: 40px;
  justify-content: center;
  align-items: center;
  color: #188803;
  background: white;
  padding: 1rem;
  margin: 4px;
  border-radius: 4px;
  padding: 1rem;
  margin: 4px;
  border-radius: 4px;
  border: solid 2px #188803;
}

.condition-input {
  display: flex;
  justify-content: center;
  align-items: baseline;
}

.input-field__request {
  padding: 1rem;
  margin: 4px;
  border-radius: 4px;
  border-style: none;
  border: rgb(59, 58, 58) solid 1px;
  transition: 0.3s ease;
  background-color: white;
  width: auto;
}

.send-request {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

.request-button {
  font-weight: 600;
  font-size: 0.85rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: #188803;
  padding: 1rem;
  border-radius: 4px;
  border: solid 2px #188803;
  width: 40%;
}

@media screen and (max-width: 1300px) {
  .firstItem-wrapper,
  .secondItem-wrapper {
    flex-basis: 90%;
    margin-right: 4.5%;
  }
}
</style>
