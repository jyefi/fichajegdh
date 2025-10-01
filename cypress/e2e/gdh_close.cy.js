describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://gdh.uv.es')
    cy.get('#username').type(Cypress.env('USERNAME'))
    cy.get('#password').type(Cypress.env('PASSWORD'))
    cy.get('#botonLdap').click()

    // Ejecuta el calendario
    cy.window().then((win) => {
      win.trap_page_key_mouse_events(1);
      win.document.Formulario_listado_jornadas.cambio.value = '1';
      win.document.Formulario_listado_jornadas.submit();
    });

    // Espera a que cargue el calendario
    cy.get('table').should('be.visible')

    // obtiene el día de hoy en formato yyyy-mm-dd
    const today = new Date().toISOString().split('T')[0]
    
    const td = cy.get(`td:has(a[href="javascript:enviar('${today}');"])`);
    
    // Comprueba si el día de hoy es festivo o no
    td.then(($td) => {
      if ($td.hasClass('traincompleto')) {
        // Ejecuta la salida (check out)

        cy.log("I'm going to check out");
        cy.writeFile('cypress/logs/warning.log', `${new Date().toLocaleString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}).replace(/,/g, '')}: Check in was executed. I'm going to check out.\n`, { flag: 'a+' });

        cy.wait(1000);

        // Entra a la página de fichaje        
        cy.window().then((win) => {
          win.trap_page_key_mouse_events(1);
          win.document.Formulario_navegacion_fichaje.submit();
        });
        cy.wait(1500);

        // Ejecuta el check out

        cy.window().then((win) => {
          win.registro('S','METHOD.FICHAJE_X_IP');
        });

        cy.writeFile('cypress/logs/warning.log', `${new Date().toLocaleString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}).replace(/,/g, '')}: System check out executed.\n`, { flag: 'a+' });

        cy.wait(1000);        
        
        cy.wrap(true).should('be.true');
        cy.visit('https://webges.uv.es/uvGestionHorariaJJWeb/logout');
        return false; // Sale de la prueba

      }
      else {
        cy.log("You haven't booked today, you have to check in");
        cy.writeFile('cypress/logs/warning.log', `${new Date().toLocaleString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}).replace(/,/g, '')}: Check out: You haven't booked today, you have to check in\n`, { flag: 'a+' });
        cy.wrap(true).should('be.true');
        cy.visit('https://webges.uv.es/uvGestionHorariaJJWeb/logout');
        return false; // Sale de la prueba
      }
    });

    // else (si no es festivo)



  })
})