describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://gdh.uv.es')
    cy.get('#username').type(Cypress.env('USERNAME'))
    cy.get('#password').type(Cypress.env('PASSWORD'))
    cy.get('#botonLdap').click()

    // Genera un tiempo de espera random entre 1 y 20 minutos
    // const randomMinutes = Math.floor(Math.random() * 20) + 1;
    // const randomWaitTime = randomMinutes * 60 * 1000; // Convert to milliseconds
    // cy.log(`Waiting for ${randomMinutes} minutes before proceeding`);
    // cy.wait(randomWaitTime);

    cy.wait(1000)

    // Ejecuta el calendario
    cy.window().then((win) => {
      win.trap_page_key_mouse_events(1);
      win.document.Formulario_listado_jornadas.cambio.value = '1';
      win.document.Formulario_listado_jornadas.submit();
    });

    // Espera a que cargue el calendario
    cy.get('table').should('be.visible');

    // obtiene el día de hoy en formato yyyy-mm-dd
    const today = new Date().toISOString().split('T')[0];

    cy.wait(1500);
    
    const td = cy.get(`td:has(a[href="javascript:enviar('${today}');"])`);
    
    // Comprueba si el día de hoy es festivo o no
    td.then(($td) => {
      if ($td.hasClass('atrapermisos') || $td.hasClass('traincompleto') || $td.hasClass('atrafestivo')) {
        // Execute the instruction
        if ($td.hasClass('atrafestivo')) {
          cy.log("Today is a holiday");
          cy.writeFile('cypress/logs/warning.log', `${new Date().toLocaleString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}).replace(/,/g, '')}: Check in: Today is a holiday. You don't have to check in today\n`, { flag: 'a+' });
        }
        if ($td.hasClass('traincompleto')) {
          cy.log("You have already booked today, you have to check out");
          cy.writeFile('cypress/logs/warning.log', `${new Date().toLocaleString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}).replace(/,/g, '')}: Check in: You have already checked in today, you have to check out\n`, { flag: 'a+' });
        }
        if ($td.hasClass('atrapermisos')) {
          cy.log("You have a permission today");
          cy.writeFile('cypress/logs/warning.log', `${new Date().toLocaleString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}).replace(/,/g, '')}: Check in: You have a permission today\nYou don't have to check in today\n`, { flag: 'a+' });
        }
        cy.wrap(true).should('be.true');
        cy.visit('https://webges.uv.es/uvGestionHorariaJJWeb/logout');
        return false;
      }
      else {
        cy.log("You haven't booked today. I'll execute the check in\n");
        cy.writeFile('cypress/logs/warning.log', `${new Date().toLocaleString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}).replace(/,/g, '')}: Check in: You haven't booked today. I'll execute the check in\n`, { flag: 'a+' });
        cy.wrap(true).should('be.true');

        cy.wait(1000);

        // Entra a la página de fichaje
        cy.window().then((win) => {
          win.trap_page_key_mouse_events(1);
          win.document.Formulario_navegacion_fichaje.submit();
        });
        cy.wait(1500);
        
        // Realiza el fichaje de entrada
        cy.window().then((win) => {
          win.registro('E','METHOD.FICHAJE_X_IP');
        });

        cy.writeFile('cypress/logs/warning.log', `${new Date().toLocaleString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}).replace(/,/g, '')}: System check in executed.\n`, { flag: 'a+' });

        cy.visit('https://webges.uv.es/uvGestionHorariaJJWeb/logout');
        return false; // Sale de la prueba
      }
    });

    // else (si no es festivo)



  })
})