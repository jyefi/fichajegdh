describe('Hola mundo test', () => {
    it('should generate "Hola mundo" and write to log file', () => {
        
        // Generate "Hola mundo"
        const message = 'Hello world';
        const logPath = 'cypress/logs/warning.log';
        
        // Write to log file
        cy.writeFile(logPath, `${new Date().toLocaleString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}).replace(/,/g, '')}: ${message}. Installation has been completed.\n`, { flag: 'a+' });

        // Define log entry
        const logEntry = `Additional log: ${message}\n`;
                
        // Verify the message was written
        cy.readFile(logPath).should('contain', message);
    });
});