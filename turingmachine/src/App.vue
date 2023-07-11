<template>
  <div class="h-screen w-screen space-y-10">
    <div class="h-16 bg-primary">
      <div class="flex items-center text-white text-2xl h-full px-10">
        Machine de turing
      </div>
    </div>
    <div class="flex px-10 space-x-6">
      <div class="w-1/2 space-y-14">
        <div class="space-y-10">
          <div>Bienvenu sur le simulateur de machine de turing</div>
          <div class="space-y-4">
            <div>
              <label for="">Quel simulateur voulez-vous lancé ?</label>
              <div class="border rounded">
                <select @change="programChange" class="p-2 w-full">
                  <option :value="p.name" v-for="p in programs">
                    {{ p.libelle }}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label for="">Entrez les de caractères du ruban</label>
              <div class="border rounded w-fit">
                <input
                  type="text"
                  v-model="caracters"
                  name=""
                  id=""
                  class="py-2 px-4 bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>

        <Ruban :ruban="ruban" :currentPosition="position"></Ruban>
        <div>
          <States
            :states="actionsKeys"
            :currentState="currentState"
            class="w-1/2"
          ></States>
          <div v-if="program && program.name == 'divisionBy3'" class="text-sm">
            La chaine binaire est divisible 3 par lorsque <br />
            l'état obtenu à la fin est
            <span class="text-primary font-bold">end</span>
          </div>
        </div>

        <div class="space-x-4">
          <button
            @click="resetTuringMachine"
            class="bg-red-900 text-white py-3 px-4 rounded text-center text-sm w-fit cursor-pointer"
            :class="{ 'bg-red-300 cursor-not-allowed': canLoadTuringMachine }"
            :disabled="canLoadTuringMachine"
          >
            Reset
          </button>
          <button
            @click="turingMachine"
            class="bg-primary text-white py-3 px-4 rounded text-center text-sm w-fit cursor-pointer"
            :class="{
              'bg-green-300 cursor-not-allowed': !canLoadTuringMachine,
            }"
            :disabled="!canLoadTuringMachine"
          >
            Lancer la machine de turing
          </button>
        </div>
      </div>

      <div class="flex justify-center items-center w-1/2 space-y-6">
        <pre>

            
          
            {{ actions }}
         
          
        </pre>
        <!-- <table class="w-full table-auto">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 py-2 px-4">
            <tr>
              <th scope="col" class="px-6 py-3" v-for="title in titles">
                {{ title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="state in actionsKeys">
              <tr
                class="bg-white border-b"
                v-for="(readValue, i) in values"
                v-if="state != 'end'"
              >
                <td
                  rowspan="3"
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50"
                  v-if="i == 0"
                >
                  <div>{{ state }}</div>
                </td>

                <td class="px-6 py-6">
                  <div class="flex items-center justify-center space-x-2">
                    <input
                      type="checkbox"
                      value="false"
                      @change="
                        onReadChange(
                          $event.target,
                          state,
                          readValue as WriteAndReadType
                        )
                      "
                    />
                    <label for="">{{ readValue }}</label>
                  </div>
                </td>
                <td>
                  <div class="flex justify-center">
                    <select
                      @change="
                        onWriteChange(
                          $event,
                          state,
                          readValue as WriteAndReadType
                        )
                      "
                    >
                      <option value="">Aucun</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="b">b</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div class="flex justify-center">
                    <select
                      name=""
                      id=""
                      @change="
                        onMoveChange(
                          $event,
                          state,
                          readValue as WriteAndReadType
                        )
                      "
                    >
                      <option value="">Aucun</option>
                      <option value="1">A droite</option>
                      <option value="-1">A gauche</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div class="flex justify-center">
                    <select
                      @change="
                        onFinalStateChange(
                          $event,
                          state,
                          readValue as WriteAndReadType
                        )
                      "
                    >
                      <option :value="s" v-for="s in actionsKeys">
                        {{ s }}
                      </option>
                    </select>
                  </div>
                </td>
              </tr>
              <tr v-else>
                <td colspan="5" class="bg-gray-100 p-4">
                  <div class="flex justify-center items-center">End</div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>

        <div class="flex flex-col items-end space-y-4">
          <div>
            <label for="">Nom de l'état</label>
            <div class="border rounded">
              <input
                type="text"
                v-model="newState"
                name=""
                id=""
                class="py-2 px-4 bg-gray-50"
              />
            </div>
          </div>

          <button
            @click="addState"
            :disabled="!newState ? true : false"
            :class="{ 'bg-green-100': !newState }"
            class="bg-primary text-white py-3 px-4 rounded text-center text-sm w-fit cursor-pointer"
          >
            Ajouter un état
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
/* @ts-ignore */
import { programs } from "@/data/index.ts";

type WriteAndReadType = "0" | "1" | "b";

interface ActionType {
  write?: WriteAndReadType;
  moveTo?: -1 | 1;
  state?: string;
}

type ActionList = Record<string, Record<WriteAndReadType, ActionType>>;

import { computed, reactive, ref, type Ref } from "vue";
import Ruban from "./components/Ruban.vue";
import States from "./components/States.vue";
const titles = ["État", "Lecture", "Écriture", "Déplacement", "Nouvel état"];

const actions = reactive<any>({...programs[0].code});

const actionsKeys = computed(() => {
  return Object.keys(actions);
});

const currentState = ref(Object.keys(actions)[0]);

//Apply turing machine
async function turingMachine() {
  resetTuringMachine()
  canLoadTuringMachine.value = false;
  const endState = "end";
  stop.value = false
  while (currentState.value != endState) {
    console.log("current state", currentState);

    if (stop.value) {
      stop.value = false;
      break;
    }
    /* @ts-ignore */
    let action = actions[currentState.value][ruban.value[position.value]];
    console.log("action", action);
    if (action) {
      if (action.write != null && action.write != "")
        ruban.value[position.value] = action.write;
      if (action.moveTo != null && action.moveTo != "")
        position.value += +action.moveTo;
      if (action.state != null) currentState.value = action.state;
    }

    await wait(2000);
  }
  canLoadTuringMachine.value = true;

}


const program = ref();

function programChange(event: any) {

  const findProgram = programs.find(
    (value: any) => value.name == event.target.value
  )
  console.log("findProgram",findProgram)

  program.value = {...findProgram};
  console.log("programm", program.value);
  

  for (const key of Object.keys(actions)) {
    delete actions[key];
  }
  Object.assign(actions, program.value.code);
  resetTuringMachine();
}


const caracters = ref("");

watch(caracters, (newValue) => {
  ruban.value = caracters.value.split("").concat(["b", "b", "b"]);
  saveRuban.value = caracters.value.split("").concat(["b", "b", "b"]);
});

//Default ruban values
const ruban = ref([1, 0, 1, 1, "b", "b", "b"]);

//Just for return old ruban value when reset
const saveRuban = ref([1, 0, 1, 1, "b", "b", "b"]);

const position = ref(0);

const canLoadTuringMachine = ref(true);

const stop = ref(false);

function resetTuringMachine() {
  
  canLoadTuringMachine.value = true;
  ruban.value = saveRuban.value;
  stop.value = true;
  position.value = 0;
  currentState.value = Object.keys(actions)[0];
}




const wait = function (time: number) {
  return new Promise((resolve: any, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};


//This part is for my turing v2

const values = ["0", "1", "b"];

const state = ref(["q0"]);



function onReadChange(event: any, state: string, value: WriteAndReadType) {
  if (event.checked) {
    actions[state][value] = {
      state: state,
    };
  } else {
    delete actions[state][value];
  }
}

function onWriteChange(event: any, state: string, readValue: WriteAndReadType) {
  const writeValue = event.target.value;
  actions[state][readValue]["write"] = writeValue;
}

function onMoveChange(event: any, state: string, readValue: WriteAndReadType) {
  const moveValue = event.target.value;
  actions[state][readValue]["moveTo"] = moveValue;
}

function onFinalStateChange(
  event: any,
  state: string,
  readValue: WriteAndReadType
) {
  const finalState = event.target.value;
  actions[state][readValue]["state"] = finalState;
}

const newState = ref("");

function addState() {
  delete actions["end"];
  actions[newState.value] = {} as any;
  actions["end"] = {} as any;
  newState.value = "";
}
</script>

<style scoped></style>
