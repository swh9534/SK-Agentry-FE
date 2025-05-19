
import { ref } from 'vue'

const purchasedAgents = ref([])

export function usePurchaseStore() {
  const addPurchase = (agent) => {
    const exists = purchasedAgents.value.find(a => a.id === agent.id)
    if (!exists) {
      purchasedAgents.value.push({ ...agent, purchased: true })  // ✅ 명시적으로 상태 포함
    }
  }

  return {
    purchasedAgents,
    addPurchase
  }
}
