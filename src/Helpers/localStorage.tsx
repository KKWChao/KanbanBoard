import { Column, Task } from "@/types";

export function savingLocal(columns: Column[], tasks: Task[]) {
  const store = {
    columns: columns,
    tasks: tasks,
  };

  const serializedStore = JSON.stringify(store);

  localStorage.setItem("data", serializedStore);
  console.log("Save to Local Storage");
}

export function loadingLocal() {
  if (localStorage.getItem("data")) {
    const data = localStorage.getItem("data");
    return JSON.parse(data || "");
  }
  return;
}
