import { Column, Task } from "@/types";

export function savingLocal(columns: Column[], tasks: Task[]) {
  const store = {
    columns: columns,
    tasks: tasks,
  };

  const serializedStore = JSON.stringify(store);

  localStorage.setItem("data", serializedStore);
  window.alert("Save to Local Storage");
  window.location.reload();
}

export function loadingLocal() {
  if (localStorage.getItem("data")) {
    const data = localStorage.getItem("data");
    return JSON.parse(data || "");
  }
  return [];
}

export function clearLocal() {
  if (localStorage.getItem("data")) {
    localStorage.removeItem("data");
    window.location.reload();
    return;
  }
  return window.alert("No Data");
}
