import { Column, Task } from "@/types";

export function savingLocal(
  columns: Column[],
  tasks: Task[],
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>
) {
  const store = {
    columns: columns,
    tasks: tasks,
  };

  const serializedStore = JSON.stringify(store);
  localStorage.setItem("data", serializedStore);
  setIsSaving(true);
  setTimeout(() => {
    setIsSaving(false);
    console.log("false");
  }, 1000);
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
