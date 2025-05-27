/**
 * Configuración de menú para el módulo de Administración
 * Este archivo exporta una función que devuelve los elementos de menú
 * que se mostrarán en el dashboard principal
 */

/**
 * Obtiene la lista de elementos de menú para el módulo de administración
 * @returns {Array} Array de objetos con los elementos del menú
 */
export function getAdminMenuItems() {
  return [
    {
      title: 'Gestionar Usuarios',
      path: '/admin/users',
      icon: 'users',
      description: 'Administración de usuarios del sistema'
    },
    {
      title: 'Configuración',
      path: '/admin/settings',
      icon: 'settings',
      description: 'Configuración general del sistema'
    },
    {
      title: 'Panel de Control',
      path: '/admin/dashboard',
      icon: 'dashboard',
      description: 'Estadísticas y métricas del sistema'
    }
  ];
}

/**
 * Agrega un nuevo elemento al menú y lo retorna
 * @param {Object} menuItem - Objeto con propiedades title y path
 * @returns {Object} El objeto de menú creado
 */
export function addMenuItem(menuItem) {
  // Validar que el objeto tenga las propiedades requeridas
  if (!menuItem.title || !menuItem.path) {
    throw new Error('El elemento de menú debe tener título y ruta');
  }
  
  // Aquí podrías implementar lógica para persistir el menú
  // Por ejemplo, enviarlo a una API o almacenarlo en localStorage
  
  // Disparar un evento para que el shell sepa que se agregó un nuevo ítem
  const event = new CustomEvent('newMenuItemAdded', { 
    detail: menuItem,
    bubbles: true
  });
  
  window.dispatchEvent(event);
  
  return menuItem;
}
