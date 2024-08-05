document.getElementById('numerologyForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const birthdate = document.getElementById('birthdate').value;

    if (name && birthdate) {
        const numerologyNumber = calculateNumerologyNumber(birthdate);
        const meaning = getNumerologyMeaning(numerologyNumber);

        // Muestra el resultado en el frontend
        document.getElementById('result').innerHTML = `
            <p>Tu número de destino es: <strong>${numerologyNumber}</strong></p>
            <p>${meaning}</p>
        `;

        // Envía los datos al backend
        try {
            const response = await fetch('http://localhost:5000/api/numerology', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    birthdate: birthdate,
                    numerologyNumber: numerologyNumber,
                    meaning: meaning
                })
            });

            const result = await response.json();
            console.log('Datos enviados:', result);
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    }
});

function calculateNumerologyNumber(date) {
    const digits = date.replace(/-/g, '').split('');
    let sum = digits.reduce((acc, digit) => acc + parseInt(digit), 0);

    while (sum > 9 && ![11, 22, 33, 44].includes(sum)) {
        sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }

    return sum;
}

function getNumerologyMeaning(number) {
    const meanings = {
        1: `Número 1: Características: Independencia, liderazgo, iniciativa. Significado: Las personas con este número son líderes naturales y pioneros. Les gusta estar en control y tienen una fuerte voluntad.`,
        2: `Número 2: Características: Cooperación, sensibilidad, diplomacia. Significado: Son personas pacíficas, buscan la armonía y son excelentes mediadores. Valoran las relaciones y son empáticas.`,
        3: `Número 3: Características: Creatividad, comunicación, sociabilidad. Significado: Son personas creativas, con gran talento para la comunicación y disfrutan de la vida social. Suelen ser optimistas y alegres.`,
        4: `Número 4: Características: Estabilidad, practicidad, trabajo duro. Significado: Son personas trabajadoras y organizadas. Valoran la estabilidad y son muy prácticas. Son buenos planificadores y constructores.`,
        5: `Número 5: Características: Libertad, aventura, adaptabilidad. Significado: Las personas con este número buscan la libertad y la aventura. Son versátiles y se adaptan bien a los cambios.`,
        6: `Número 6: Características: Responsabilidad, amor, servicio. Significado: Son personas responsables y cariñosas. Tienen un fuerte sentido de servicio hacia los demás y valoran la familia y el hogar.`,
        7: `Número 7: Características: Introspección, análisis, espiritualidad. Significado: Son personas analíticas y profundas. Buscan la verdad y tienen un interés natural por lo espiritual y lo filosófico.`,
        8: `Número 8: Características: Ambición, poder, éxito material. Significado: Son personas ambiciosas y orientadas al éxito. Valoran el poder y los logros materiales, y suelen ser buenos en los negocios.`,
        9: `Número 9: Características: Compasión, idealismo, humanitarismo. Significado: Son personas compasivas y desinteresadas. Tienen un fuerte sentido de justicia y trabajan por el bienestar de la humanidad.`,
        11: `Número 11: Características: Inspiración, iluminación, intuición. Significado: Las personas con este número son altamente intuitivas y espirituales. Son visionarios e inspiran a otros con su sabiduría y percepción.`,
        22: `Número 22: Características: Maestría, pragmatismo, grandes logros. Significado: Son personas que pueden transformar sus sueños en realidad a gran escala. Tienen una capacidad excepcional para llevar a cabo grandes proyectos y tener un impacto significativo en el mundo.`,
        33: `Número 33: Características: Amor universal, enseñanza, sanación. Significado: Este número representa el amor universal y la sanación. Son maestros espirituales y curanderos que dedican su vida al servicio de la humanidad.`,
        44: `Número 44: Características: Estructura, manifestación, logros materiales y espirituales. Significado: Las personas con este número combinan la capacidad de manifestar logros materiales con una profunda comprensión espiritual. Son capaces de crear estructuras sólidas que beneficien a muchos.`
    };

    return meanings[number] || "Número desconocido.";
}
