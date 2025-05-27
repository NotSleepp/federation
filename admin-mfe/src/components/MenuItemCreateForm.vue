<script setup>
import { ref } from 'vue';
import { addMenuItem } from '../menuConfig';

const title = ref('');
const path = ref('');
const icon = ref('default');
const description = ref('');
const successMessage = ref('');
const errorMessage = ref('');
const isSubmitting = ref(false);

// Iconos disponibles
const availableIcons = [
  { value: 'default', label: 'Predeterminado' },
  { value: 'users', label: 'Usuarios' },
  { value: 'settings', label: 'Configuración' },
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'reports', label: 'Reportes' },
  { value: 'chart', label: 'Gráficos' }
];

/**
 * Maneja el envío del formulario para crear un nuevo elemento de menú
 */
const handleSubmit = () => {
  // Validar formulario
  if (!title.value || !path.value) {
    errorMessage.value = 'Por favor completa todos los campos obligatorios';
    successMessage.value = '';
    return;
  }
  
  // Validar formato de ruta
  if (!path.value.startsWith('/')) {
    path.value = '/' + path.value;
  }
  
  // Simular envío a API
  isSubmitting.value = true;
  errorMessage.value = '';
  
  try {
    // Crear objeto de menú
    const newMenuItem = {
      title: title.value,
      path: path.value,
      icon: icon.value !== 'default' ? icon.value : undefined,
      description: description.value || undefined
    };
    
    // Agregar el elemento de menú utilizando la función del menuConfig
    // Esto también disparará el evento CustomEvent
    addMenuItem(newMenuItem);
    
    // Mostrar mensaje de éxito
    successMessage.value = `Elemento de menú "${title.value}" creado exitosamente`;
    isSubmitting.value = false;
    
    // Limpiar formulario
    resetForm();
  } catch (error) {
    errorMessage.value = error.message || 'Error al crear el elemento de menú';
    isSubmitting.value = false;
  }
};

/**
 * Resetea el formulario a su estado inicial
 */
const resetForm = () => {
  title.value = '';
  path.value = '';
  icon.value = 'default';
  description.value = '';
  errorMessage.value = '';
};
</script>

<template>
  <div class="menu-form-container bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Crear Elemento de Menú</h2>
    
    <!-- Mensaje de éxito -->
    <div v-if="successMessage" class="success-message bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
      {{ successMessage }}
    </div>
    
    <!-- Mensaje de error -->
    <div v-if="errorMessage" class="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ errorMessage }}
    </div>
    
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
          Título <span class="text-red-500">*</span>
        </label>
        <input
          id="title"
          v-model="title"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nombre del elemento de menú"
          required
        />
      </div>
      
      <div class="mb-4">
        <label for="path" class="block text-sm font-medium text-gray-700 mb-1">
          Ruta <span class="text-red-500">*</span>
        </label>
        <div class="flex">
          <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
            /admin
          </span>
          <input
            id="path"
            v-model="path"
            type="text"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="/ruta-del-menu"
            required
          />
        </div>
        <p class="mt-1 text-sm text-gray-500">Ejemplo: /users, /settings/profile</p>
      </div>
      
      <div class="mb-4">
        <label for="icon" class="block text-sm font-medium text-gray-700 mb-1">
          Icono
        </label>
        <select
          id="icon"
          v-model="icon"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option v-for="option in availableIcons" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      
      <div class="mb-6">
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          id="description"
          v-model="description"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Descripción breve del elemento de menú"
          rows="2"
        ></textarea>
      </div>
      
      <div class="flex justify-end">
        <button
          type="button"
          @click="resetForm"
          class="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center"
        >
          <span v-if="isSubmitting" class="inline-block w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          {{ isSubmitting ? 'Procesando...' : 'Crear Elemento' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.menu-form-container {
  max-width: 100%;
}

@media (min-width: 640px) {
  .menu-form-container {
    min-width: 500px;
  }
}
</style>
