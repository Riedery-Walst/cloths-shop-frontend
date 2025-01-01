<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-for="(crumb, index) in breadcrumbs" :key="index" class="breadcrumb-item">
        <router-link v-if="crumb.link" :to="crumb.link">{{ crumb.name }}</router-link>
        <span v-else>{{ crumb.name }}</span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      const path = this.$route.path.split('/').filter(Boolean);
      let breadcrumbs = [{ name: 'Главная', link: '/' }];

      if (path.length > 0) {
        // Для страницы продуктов
        if (path[0] === 'products' || this.$route.path === '/') {
          breadcrumbs.push({
            name: 'Продукты',
            link: '/products',
          });
        }

        // Для страницы товара
        else if (path[0] === 'product') {
          breadcrumbs.push({
            name: `Товар ${this.$route.params.id}`,
            link: null
          });
        }

        // Для корзины
        else if (path[0] === 'cart') {
          breadcrumbs.push({
            name: 'Корзина',
            link: '/cart'
          });
        }

        // Для оформления заказа
        else if (path[0] === 'checkout') {
          breadcrumbs.push({
            name: 'Оформление заказа',
            link: '/checkout'
          });
        }

        // Для профиля
        else if (path[0] === 'profile') {
          breadcrumbs.push({
            name: 'Профиль',
            link: '/profile'
          });
        }

        // Для страницы входа
        else if (path[0] === 'login') {
          breadcrumbs.push({
            name: 'Вход',
            link: null
          });
        }

        // Для страницы регистрации
        else if (path[0] === 'register') {
          breadcrumbs.push({
            name: 'Регистрация',
            link: null
          });
        }

        // Для политики конфиденциальности
        else if (path[0] === 'privacy-policy') {
          breadcrumbs.push({
            name: 'Политика конфиденциальности',
            link: null
          });
        }

        // Для условий использования
        else if (path[0] === 'terms-of-service') {
          breadcrumbs.push({
            name: 'Условия использования',
            link: null
          });
        }

        // Для админки
        else if (path[0] === 'admin') {
          if (path[1] === 'colors') {
            breadcrumbs.push({
              name: 'Цвета',
              link: '/admin/colors'
            });
            if (path[2] === 'add') {
              breadcrumbs.push({
                name: 'Добавить цвет',
                link: '/admin/colors/add'
              });
            }
          } else if (path[1] === 'sizes') {
            breadcrumbs.push({
              name: 'Размеры',
              link: '/admin/sizes'
            });
            if (path[2] === 'add') {
              breadcrumbs.push({
                name: 'Добавить размер',
                link: '/admin/sizes/add'
              });
            }
          } else if (path[1] === 'products') {
            breadcrumbs.push({
              name: 'Продукты',
              link: '/admin/products'
            });
            if (path[2] === 'add') {
              breadcrumbs.push({
                name: 'Добавить продукт',
                link: '/admin/products/add'
              });
            } else if (path[2] === 'edit') {
              breadcrumbs.push({
                name: `Редактировать продукт ${this.$route.params.id}`,
                link: null
              });
            }
          } else if (path[1] === 'orders') {
            breadcrumbs.push({
              name: 'Заказы',
              link: '/admin/orders'
            });
          }
        }
      }

      return breadcrumbs;
    },
  },
};
</script>

<style scoped>
.breadcrumb {
  list-style: none;
  padding-top: 40px;
  padding-bottom: 40px;
  padding-left: 135px;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.breadcrumb-item {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 21px;
  font-family: Poppins, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  color: rgb(0, 0, 0);
  opacity: 0.5;
  text-align: left;
}

.breadcrumb-item a {
  text-decoration: none;
  color: inherit;
}

.breadcrumb-item + .breadcrumb-item:before {
  content: "/";
  margin: 0 12px;
  color: rgba(0, 0, 0, 0.5);
  display: inline-block;
}

.breadcrumb-item:last-child {
  opacity: 1;
}

.breadcrumb-item:last-child a {
  color: rgb(0, 0, 0);
}

.breadcrumb-item:last-child span {
  color: rgb(0, 0, 0);
  opacity: 1;
}

.breadcrumb-item a:hover,
.breadcrumb-item span:hover {
  color: #DB4444;
  opacity: 1;
}
</style>
