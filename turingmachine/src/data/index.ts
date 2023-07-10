export const programs = [
    {
        libelle : "Increment",
        name : "Increment",
        code : {
            q0: {
                0: {
                  moveTo: 1,
                },
                1: {
                  moveTo: 1,
                },
                b: {
                  moveTo: -1,
                  state: "q1",
                },
              },
              q1: {
                0: {
                  write: "1",
                  moveTo: -1,
                  state: "end",
                },
                1: {
                  write: "0",
                  moveTo: -1,
                },
                b: {
                  write: "1",
                  moveTo: -1,
                  state: "end",
                },
              },
        }
       
      }
]


;