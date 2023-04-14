/**
 * handles hiScores storage
 *
 * if no hiScores are set, localStorage default is 0,0,0
 */
export function handleHiScoreStorage(time: number, mode?: string) {
  if (!mode) {
    alert("Unable to fetch HiScore data")
    return
  }
  const hiScores = localStorage
    .getItem(`${mode}-scores`)
    ?.split(",")
    .map((hs) => +hs)
  if (!hiScores) {
    alert("Unable to fetch HiScore data")
    return
  }
  const newHiScores = [...hiScores, time]
    .filter((hs) => hs !== 0)
    .sort((a, b) => a - b)
  while (newHiScores.length !== 3) {
    if (newHiScores.length < 3) newHiScores.push(0)
    if (newHiScores.length > 3) newHiScores.pop()
  }
  localStorage.setItem(`${mode}-scores`, newHiScores.join())
}
