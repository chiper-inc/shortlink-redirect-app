export default function Fallback() {
  return (
    <h1>
      Could not open the app.{' '}
      <a href="https://play.google.com/store/apps/details?id=com.myapp">
        Install it here
      </a>
    </h1>
  );

  // TODO detectar el sistema operativo del usuario y navegador
  // Incluir una card con:
  // - Invitación al usuario a instalar la app
  // - Un botón que lo lleve a la tienda correspondiente, la href de la tienda debe venir como parametro
}
