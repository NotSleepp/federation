<script setup>
import { ref } from 'vue';
import UserCreateForm from './components/UserCreateForm.vue';
import MenuItemCreateForm from './components/MenuItemCreateForm.vue';

// Controlar la pestaña activa
const activeTab = ref('users');

// Cambiar entre pestañas
const setActiveTab = (tab) => {
  activeTab.value = tab;
};
</script>

<template>
  <div class="admin-app">
    <header class="admin-header bg-gray-800 text-white p-4">
      <h1 class="text-xl font-bold">Panel de Administración</h1>
      <p class="text-sm text-gray-300">MicroFrontend de Administración</p>
    </header>
    
    <div class="admin-content p-6">
      <!-- Tabs de navegación -->
      <div class="admin-tabs mb-6 border-b border-gray-200">
        <nav class="flex space-x-4">
          <button 
            @click="setActiveTab('users')" 
            :class="[activeTab === 'users' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700', 'py-4 px-2 font-medium']"
          >
            Gestionar Usuarios
          </button>
          <button 
            @click="setActiveTab('menu')" 
            :class="[activeTab === 'menu' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700', 'py-4 px-2 font-medium']"
          >
            Gestionar Menú
          </button>
        </nav>
      </div>
      
      <!-- Contenido de las pestañas -->
      <div class="admin-tab-content">
        <!-- Pestaña de Usuarios -->
        <div v-if="activeTab === 'users'" class="users-tab">
          <div class="tab-intro mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Gestión de Usuarios</h2>
            <p class="text-gray-600">Crea y administra los usuarios del sistema.</p>
          </div>
          
          <UserCreateForm />
        </div>
        
        <!-- Pestaña de Menú -->
        <div v-if="activeTab === 'menu'" class="menu-tab">
          <div class="tab-intro mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Gestión de Menú</h2>
            <p class="text-gray-600">Personaliza los elementos del menú que aparecen en el dashboard.</p>
          </div>
          
          <MenuItemCreateForm />
        </div>
      </div>
    </div>
    
    <footer class="admin-footer bg-gray-100 p-4 text-center text-gray-600 text-sm border-t border-gray-200">
      Admin MFE v1.0.0 - Integrado con Dashboard Shell
    </footer>
  </div>
</template>

<style scoped>
.admin-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9fafb;
}

.admin-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.admin-content {
  flex: 1;
}

@media (min-width: 768px) {
  .admin-content {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }
}
</style>
