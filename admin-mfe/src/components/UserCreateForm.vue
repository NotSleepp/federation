<script setup>
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const role = ref('user');
const successMessage = ref('');
const errorMessage = ref('');
const isSubmitting = ref(false);

// Roles disponibles
const availableRoles = [
  { value: 'user', label: 'Usuario' },
  { value: 'admin', label: 'Administrador' },
  { value: 'editor', label: 'Editor' }
];

/**
 * Maneja el envío del formulario de creación de usuario
 */
const handleSubmit = () => {
  // Validar formulario
  if (!name.value || !email.value) {
    errorMessage.value = 'Por favor completa todos los campos obligatorios';
    successMessage.value = '';
    return;
  }
  
  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    errorMessage.value = 'Por favor ingresa un email válido';
    successMessage.value = '';
    return;
  }
  
  // Simular envío a API
  isSubmitting.value = true;
  errorMessage.value = '';
  
  // Simular delay de API
  setTimeout(() => {
    // Crear objeto de usuario
    const newUser = {
      id: Math.floor(Math.random() * 1000),
      name: name.value,
      email: email.value,
      role: role.value,
      createdAt: new Date().toISOString()
    };
    
    // Simular respuesta exitosa
    console.log('Usuario creado:', newUser);
    successMessage.value = `Usuario ${name.value} creado exitosamente`;
    isSubmitting.value = false;
    
    // Limpiar formulario
    resetForm();
  }, 800);
};

/**
 * Resetea el formulario a su estado inicial
 */
const resetForm = () => {
  name.value = '';
  email.value = '';
  role.value = 'user';
  errorMessage.value = '';
};
</script>

<template>
  <div class="user-form-container bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Crear Usuario</h2>
    
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
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
          Nombre <span class="text-red-500">*</span>
        </label>
        <input
          id="name"
          v-model="name"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingresa el nombre completo"
          required
        />
      </div>
      
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
          Email <span class="text-red-500">*</span>
        </label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="ejemplo@correo.com"
          required
        />
      </div>
      
      <div class="mb-6">
        <label for="role" class="block text-sm font-medium text-gray-700 mb-1">
          Rol
        </label>
        <select
          id="role"
          v-model="role"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option v-for="option in availableRoles" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
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
          {{ isSubmitting ? 'Procesando...' : 'Crear Usuario' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.user-form-container {
  max-width: 100%;
}

@media (min-width: 640px) {
  .user-form-container {
    min-width: 500px;
  }
}
</style>
