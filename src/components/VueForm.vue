<template>
  <div v-if="!isPageVisible" class="container">
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
            :class="{errorsMessage: errors[field.name as keyof Data]}"
            v-model="data[field.name as keyof Data]"
            :disabled="!isFieldDisabled(field.name)"
          />
          <p v-if="errors[field.name as keyof Data]" class="error-message">
            {{ errors[field.name as keyof Data] }}
          </p>
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
            <p v-if="errors.customerImage" class="error-message">
              {{ errors.customerImage }}
            </p>
            <div
              v-for="image in data.customerImage"
              class="uploaded-image__container"
            >
              <p>{{ image.name }}</p>
              <div class="button-group">
                <button>Ok</button>
                <button
                  @click="removeImage(image)"
                  class="upload-image__delete"
                >
                  Del
                </button>
              </div>
            </div>
            <div class="condition-input">
              <input type="checkbox" v-model="data.checked" />
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
        <button
          class="request-button"
          :disabled="!enableButton"
          @click="sendRequest"
        >
          Invia richiesta
        </button>
      </div>
    </div>
  </div>
  <SummaryPage :data="data" v-if="isPageVisible" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import { customerData } from "@/constants";
import { requestType } from "@/constants";
import { customerSchema } from "@/schema";
import type { Data } from "@/types";
import "@/components/VueForm.css";
import SummaryPage from "./SummaryPage.vue";

const route = useRoute();
const isPageVisible = ref(false);

const errors = ref<Record<keyof Data, string>>({
  customerName: "",
  customerLastName: "",
  customerEmail: "",
  customerPhone: "",
  customerNegozio: "",
  requestType: "",
  requestSpecific: "",
  customerImage: "",
  checked: "",
});

const data = ref<Data>({
  customerName: "",
  customerLastName: "",
  customerEmail: "",
  customerPhone: "",
  customerNegozio: "",
  requestType: "",
  requestSpecific: "",
  customerImage: [] as File[],
  checked: false,
});

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const cn = params.get("cn");
  const cs = params.get("cs");

  if (cn) {
    data.value.customerName = cn;
  }
  if (cs) {
    data.value.customerLastName = cs;
  }
});

const isFieldDisabled = (fieldName: string) => {
  const params = new URLSearchParams(window.location.search);
  const cn = params.get("cn");
  const cs = params.get("cs");

  if (fieldName === "customerName" && cs) {
    return false;
  }
  if (fieldName === "customerLastName" && cn) {
    return false;
  } else {
    return true;
  }
};

const handleSelectChange = (requestTypeName: string) => {
  options.value = requestType.selections.find(
    (el) => el.name === requestTypeName
  )!.options;
};
const options = ref<{ name: string; label: string; value: string }[]>([]);

const enableButton = computed(() => {
  return (
    Object.values(data.value).every((val) => {
      if (Array.isArray(val)) {
        return val.length > 0;
      }
      return val !== "" && val !== null;
    }) && data.value.checked
  );
});

const fileInput = ref<HTMLInputElement>();
const uploadDocument = () => {
  fileInput.value!.click();
};

const handleFileUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (!files) return;

  const selectedFiles = Array.from(files);
  const maxSize = 6 * 1024 * 1024;

  const validFiles = ["application/pdf", "image/jpeg", "image/png"];
  const invalidFileTypes = selectedFiles.filter(
    (file) => !validFiles.includes(file.type)
  );

  const totalFileSize = data.value.customerImage.reduce(
    (acc, curr) => acc + curr.size,
    0
  );
  const newFilesSize = selectedFiles.reduce((acc, curr) => acc + curr.size, 0);

  if (totalFileSize + newFilesSize > maxSize) {
    errors.value.customerImage =
      "Tutti i file non devono superare la dimensione massima di 6MB.";
    return;
  }
  if (invalidFileTypes.length > 0) {
    errors.value.customerImage =
      "File non valido. Formati accettati: PDF, JPG, JPEG, PNG.";
    return;
  }

  errors.value.customerImage = "";
  data.value.customerImage.push(...selectedFiles);
};

const removeImage = (img: File) => {
  data.value.customerImage = data.value.customerImage.filter(
    (image) => image.name !== img.name
  );
};

const sendRequest = () => {
  const validation = customerSchema.safeParse(data.value);

  Object.keys(errors.value).forEach((key) => {
    errors.value[key as keyof Data] = "";
  });

  if (!validation.success) {
    validation.error.errors.forEach((error) => {
      console.log(error.path, "path");
      const fieldName = error.path[0] as keyof Data;
      console.log(fieldName, ".......");
      errors.value[fieldName] = error.message;
    });

    console.log("Validation errors:", errors.value);
    return;
  }
  isPageVisible.value = true;
};

watch(data.value, (newVal, oldVal) => console.log(newVal));
</script>
