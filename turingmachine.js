const actions = {
  q0: {
    0: {
      moveTo: 1,
    },
    1: {
      moveTo: 1,
    },
    e: {
      moveTo: -1,
      state: "q1",
    },
  },
  q1: {
    0: {
      write: 1,
      moveTo: -1,
      state: "end",
    },
    1: {
      write: 0,
      moveTo: -1,
    },
    e: {
      write: 1,
      moveTo: -1,
      state: "end",
    },
  },
};

ruban = [1, 0, 1, 1,'e','e','e'];

function turingMachine(actions, ruban) {
  currentState = Object.keys(actions)[0];
  endState = "end";
  position = 1;

  while (currentState != endState) {

   

    action = actions[currentState][ruban[position]];
    console.log('action', action)
    if (action) {
      if (action.write != null) ruban[position] = action.write;
      if (action.moveTo != null) position += action.moveTo;
      if (action.state != null) currentState = action.state;
    } else break;
  }

  console.log("state: ", currentState);
  console.log("ruban", ruban);
}


turingMachine(actions,ruban)
