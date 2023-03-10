
var origemParam = '';
var iscaParam = '';
if (window.location.search) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get('origem')) { origemParam = urlParams.get('origem'); }
    if (urlParams.get('isca')) { iscaParam = urlParams.get('isca'); }
};

// >>> SETUP >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

let formElement = document.querySelector('#wf-form-pedido');

//QUALIFICAÇÃO por número de funcionários
var qtdFuncionarios = 0;
let qualificacaoPme = [0, 500];
let qualificacaoMiddle = [500, 2000];
let qualificacaoHiMiddle = [2000, 5000];
let qualificacaoCorp = [5000, 10000];
let qualificacaoHiCorp = [10000, Infinity];
let prioridadeValue = 'Quente'; // 'Quente' ou ''

//Redirecionamentos
let redirectPme = '/fale-com-consultor-typg-dq-pme';
let redirectMiddle = '/fale-com-consultor-typg-ql-middle-mql3';
let redirectHiMiddle = '/fale-com-consultor-typg-ql-himiddle-mql3';
let redirectCorp = '/fale-com-consultor-typg-ql-himiddle-mql3';
let redirectHiCorp = '/fale-com-consultor-typg-ql-himiddle-mql3';

//TAGs Config
let projetoValue = '3778'; // NOME DO PROJETO ou '3778' ou 'IMTEP'
let funilValue = { opcao0: '', opcao1: 'MQL2', opcao2: 'MQL3' };
let qualificacaoValue = { opcao0: '', opcao1: 'NAO_QUALIFICADO', opcao2: 'QUALIFICADO' };
let origemValue = { opcao0: '', opcao1: 'INST', opcao2: 'LP', opcao3: 'ISCA' };
let iscaValue = { opcao0: '', opcao1: 'EBOOK', opcao2: 'CHECKLIST', opcao3: 'CARTILHA', opcao4: 'CALCULADORA', opcao5: 'PLANNER' };
let categoriaValue = { opcao0: '', opcao1: 'PME', opcao2: 'MIDDLE', opcao3: 'HI_MIDDLE', opcao4: 'CORP', opcao5: 'HI_CORP' };

//TAGS Init
let tags = {
    tagProjeto: projetoValue,
    tagFunil: funilValue.opcao0, //opcao0:'', opcao1:'MQL2', opcao2:'MQL3'
    tagQualificacao: qualificacaoValue.opcao0, //opcao0:'', opcao1:'NAO_QUALIFICADO', opcao2:'QUALIFICADO'
    tagOrigem: origemValue.opcao1, //opcao0:'', opcao1:'INST', opcao2:'LP', opcao3:'ISCA'
    tagIsca: iscaValue.opcao0, //opcao0:'', opcao1:'EBOOK', opcao2:'CHECKLIST', opcao3:'CARTILHA', opcao4:'CALCULADORA', opcao5:'PLANNER'
    tagCategoria: categoriaValue.opcao0 //opcao0:'', opcao1:'PME', opcao2:'MIDDLE', opcao3:'HI_MIDDLE', opcao4:'CORP', opcao5:'HI_CORP'
}; 

// <<< SETUP <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<





// >>> INIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


if (origemParam != '') { tags.tagOrigem = origemParam; }; // console.log('Origem foi!'); };
if (iscaParam != '') { tags.tagIsca = iscaParam; }; // console.log('Isca foi!'); };

let validRegex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//let selectCargo = formElement.querySelector('[name="MMERGE12"]');
//let selectCargoFake = formElement.querySelector('[name="MMERGE12FAKE"]');
//let outroCargo = formElement.querySelector('[name="outro_cargo"]');
//let selectSegmento = formElement.querySelector('[name="MMERGE15"]');
//let selectSegmentoFake = formElement.querySelector('[name="MMERGE15FAKE"]');
//let outroSegmento = formElement.querySelector('[name="outro_segmento"]');
//let selectDepartamento = formElement.querySelector('[name="DEPARTAMENTO"]');
//let selectDepartamentoFake = formElement.querySelector('[name="DEPARTAMENTOFAKE"]');
//let outroDepartamento = formElement.querySelector('[name="outro_departamento"]');
//let selectCargoDepartamento = formElement.querySelector('[name="CARGO_DEPARTAMENTO"]');
//let selectFuncionarios = formElement.querySelector('[name="MMERGE31"]');
let btnSubmit = formElement.querySelector('input[type=submit]');
//let inputMail = formElement.querySelector('input[type=email]');
//let labelMail = inputMail.parentElement.querySelector('label');
let textError = formElement.querySelectorAll('.msg-error');
//let tagElement = formElement.querySelector('#tags');
let prioridadeElement = formElement.querySelector('#prioridade');
//let qualificacaoElement = formElement.querySelector('#Qualificacao');
let projetoElement = formElement.querySelector('#Projeto');
//let iscaElement = formElement.querySelector('#Isca');
let funilElement = formElement.querySelector('#Funil');
let inputTelefoneFake = formElement.querySelector('[name="MMERGE6FAKE"]');
let inputTelefoneSend = formElement.querySelector('[name="MMERGE6"]');
let categoriaElement = formElement.querySelector('[name="sendCategoria"]');
let origemElement = formElement.querySelector('#Origem');
let inputCnpj = formElement.querySelector('#cnpj');


origemElement.value = tags.tagOrigem;
//projetoElement.value = projetoValue;
//iscaElement.value = tags.tagIsca;
//categoriaElement.value = tags.tagCategoria;

formElement.querySelector('#pageTitle').value = window.document.title;
formElement.querySelector('#pageUrl').value = window.location.href;
formElement.querySelector('#formName').value = formElement.id;

/* 
function refreshTags() {
    tagElement.value = Object.values(tags).join(', ');
    // console.log('tags: ' + JSON.stringify(tags));
    //			// console.log(tagElement.value);
};
refreshTags();
*/





// <<< INIT <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<




// SEGUNDO SCRIPT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>






//E_MAIL >>>>>>>>>>
function funcInputMail(element) {
    var emailOrigin = element.value.toLowerCase();
    btnSubmit.setAttribute('disabled', 'disabled');

    if (emailOrigin.match(validRegex)) {
        var splitMail = emailOrigin.split('@')[1];
        var mailToFind = splitMail.split('.')[0];
        mailTarget = dominiosNegados.find(element => element == mailToFind) ? false : true;

        if (element.value !== '' && mailTarget == true) {
            btnSubmit.removeAttribute("disabled");
            labelMail.classList.remove('text-danger');
            labelMail.innerText = 'E-mail corporativo';
            element.classList.remove('mail-disable');
            btnSubmit.classList.add('bg-success', 'text-dark');
            btnSubmit.classList.remove('btn-disable');
            textError.forEach(function (element, index) { element.style.display = 'none'; });
        } else {
            labelMail.classList.add('text-danger');
            labelMail.innerText = 'E-mail';
            element.classList.add('mail-disable');
            btnSubmit.classList.remove('bg-success', 'text-dark');
            btnSubmit.classList.add('btn-disable');
            textError.forEach(function (element, index) { element.style.display = 'inline-block'; });
        };
    } else if (element.value == '') {
        btnSubmit.removeAttribute("disabled");
        labelMail.classList.remove('text-danger');
        labelMail.innerText = 'E-mail corporativo';
        element.classList.remove('mail-disable');
        btnSubmit.classList.remove('btn-disable', 'bg-success', 'text-dark');
        textError.forEach(function (element, index) { element.style.display = 'none'; });
    } else {
        labelMail.classList.add('text-danger');
        labelMail.innerText = 'E-mail';
        element.classList.add('mail-disable');
        btnSubmit.classList.add('btn-disable');
        textError.forEach(function (element, index) { element.style.display = 'inline-block'; });
    };
    //refreshTags();
};


//ENVIO DO FORM >>>>>>>>>>
formElement.onsubmit = async function handleSubmit(event) {
    formElement.querySelector('#sendDate').value = String(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
    formElement.querySelector('#sendHour').value = String(new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());
    var oldTextSubmit = btnSubmit.value;
    var statusDone = formElement.parentElement.querySelector('.w-form-done');
    var statusFail = formElement.parentElement.querySelector('.w-form-fail');
    var data = new FormData(event.target);
    btnSubmit.setAttribute('disabled', 'disabled');
    btnSubmit.value = 'Aguarde...';
    event.preventDefault();
    fetch(event.target.action, {
        method: formElement.method,
        body: data,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            //DATA-LAYER
            const data = new FormData(event.target);
            const dl_form_values = Object.fromEntries(data.entries());
            dataLayer.push({ dl_form_values });

            formElement.style.display = 'none';
            statusDone.style.display = 'block';
            statusFail.style.display = 'none';
            formElement.reset();

            if (qtdFuncionarios < qualificacaoPme[1]) {
                window.location.replace(redirectPme);
            } else if (qtdFuncionarios >= qualificacaoMiddle[0] && qtdFuncionarios < qualificacaoMiddle[1]) {
                window.location.replace(redirectMiddle);
            } else if (qtdFuncionarios >= qualificacaoHiMiddle[0] && qtdFuncionarios < qualificacaoHiMiddle[1]) {
                window.location.replace(redirectHiMiddle);
            } else if (qtdFuncionarios > qualificacaoCorp[0] && qtdFuncionarios < qualificacaoCorp[1]) {
                window.location.replace(redirectCorp);
            } else if (qtdFuncionarios >= qualificacaoHiCorp[0] && qtdFuncionarios < qualificacaoHiCorp[1]) {
                window.location.replace(redirectHiCorp);
            } else {
                window.location.replace(redirectHiCorp);
            };
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    statusDone.style.display = 'none';
                    statusFail.style.display = 'block';
                } else {
                    statusDone.style.display = 'none';
                    statusFail.style.display = 'block';
                };
            })
        };
    }).catch(error => {
        // console.log('catch error');
    });
};






//TERCEIRO SCRIPT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>





let oSlider			= document.querySelector('#slider-pedido');
let osSlides			= oSlider.querySelectorAll('.w-slide');
let prevSlide		= oSlider.querySelector('#prev-slide');
let nextSlide		= oSlider.querySelector('#next-slide');
let btsAvancar		= oSlider.querySelectorAll('.bt-avancar');
let inputsDoSLide;
let slideAtual;
let idNumber			= 1;
let inputTotalVidas	= oSlider.querySelector('#total-vidas');
let totalAllVidas	= 0;

inputTotalVidas.setAttribute("disabled", true);

//selectEstados	= oSlider.querySelectorAll('.select-estados');
//inputCnpj		= oSlider.querySelector('#cnpj');





function ativaAvancar() {
    setTimeout(function () {
        var avancaBrasil = true;
        for (let i = 0; i < inputsDoSLide.length; i++) {
            if (inputsDoSLide[i].value == '') {
                avancaBrasil = false;
            };

            if (inputsDoSLide[i].type == 'radio' && !slideAtual.getElementsByClassName('w-form-formradioinput--inputType-custom radio-button w--redirected-checked').length) {
                avancaBrasil = false;
//                // console.log('length radio: ' + slideAtual.getElementsByClassName('w-form-formradioinput--inputType-custom radio-button w--redirected-checked').length);
            };

            if (inputsDoSLide[i].type == 'checkbox') {
//                // console.log('length checkbox222222222: ' + slideAtual.getElementsByClassName('w-checkbox-input--inputType-custom checkbox w--redirected-checked').length);
            };

            if (inputsDoSLide[i].type == 'checkbox' && !slideAtual.getElementsByClassName('w-checkbox-input--inputType-custom checkbox w--redirected-checked').length) {
                avancaBrasil = false;
//                // console.log('length checkbox: ' + slideAtual.getElementsByClassName('w-checkbox-input--inputType-custom checkbox w--redirected-checked').length);
            };
        };

//        // console.log('avancaBrasil: ' + avancaBrasil)

        if (avancaBrasil) {
            for (let i = 0; i < btsAvancar.length; i++) {
                btsAvancar[i].style.pointerEvents = 'auto';
                btsAvancar[i].style.backgroundColor = '#ffb71d';
                btnSubmit.style.pointerEvents = 'auto';
                btnSubmit.style.backgroundColor = 'green';
                
            };
        } else {
            for (let i = 0; i < btsAvancar.length; i++) {
                btsAvancar[i].style.pointerEvents = 'none';
                btsAvancar[i].style.backgroundColor = 'grey';
                btnSubmit.style.pointerEvents = 'none';
            };
        }
    }, 50) 
};



 

function getInputs() {
    for (let i = 0; i < osSlides.length; i++) {
        if (!osSlides[i].hasAttribute("aria-hidden")) {            
            
            inputsDoSLide = osSlides[i].querySelectorAll('input[type="text"], input[type="number"], input[type="email"], input[type="tel"], input[type="radio"], input[type="checkbox"], select, textarea');
            
            for (let i = 0; i < inputsDoSLide.length; i++) {
                if (inputsDoSLide[i].type == 'checkbox') {
                    inputsDoSLide[i].onchange = function () {
                        ativaAvancar();
                        resizear();
                    }; 
                } else {
                    inputsDoSLide[i].oninput = function () {
                        ativaAvancar();
                        resizear();
                    };    
                }
            };
        };
        
    };
};


function changeSlide() {
    for (let i = 0; i < osSlides.length; i++) {
        if (!osSlides[i].hasAttribute("aria-hidden")) {
            slideAtual = osSlides[i];
            getInputs();
        };
    };
    ativaAvancar();
};


function resizear() {
    oSlider.style.height = 'auto';
    let targetHeight = oSlider.offsetHeight;
    oSlider.style.height = targetHeight + 'px';
};


// ESTADOS E MUNICIPIOS
	const urlEstados = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome';
	
	async function getEstados() {
		const estados = await fetch(urlEstados);
			if (estados.status == 200) {
			const estado = estados.json();
			return estado;
		} else {
			let selectEstados = document.getElementById('select-estados');
		    selectEstados.innerHTML = '<option value="">Erro...</option>';
		}
	}
	
	async function setEstados() {
		let estados = await getEstados();
		let selectEstados = document.getElementById('select-estados');
		selectEstados.innerHTML = '<option value="">Selecione...</option>';
		
		estados.forEach(function (e) {
			selectEstados.innerHTML += '<option value="'+ e.id +'">'+ e.nome +'</option>';
		});
	}

	async function getMunicipios(estado) {
		// console.log('estado: ' + estado);
		const urlMunicipios = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+ estado +'/municipios';
		
		const municipios = await fetch(urlMunicipios);
			if (municipios.status == 200) {
			const municipio = municipios.json();
			return municipio;
		} else {
			let selectMunicipios = document.getElementById('select-municipios');
		    selectMunicipios.innerHTML = '<option value="">Erro...</option>';
		}
	}
	
	async function setMunicipios(estado) {
		let selectMunicipios = estado.parentElement.parentElement.querySelector('.input-cidade');
		selectMunicipios.innerHTML = '<option value="">Aguarde…</option>';
		let municipios = await getMunicipios(estado.value);
		selectMunicipios.innerHTML = '<option value="">Selecione...</option>';
		
		municipios.forEach(function (e) {
			selectMunicipios.innerHTML += '<option value="'+ e.id +'">'+ e.nome +'</option>';
		});
	}
	
    
    
    function renameInputs() {
		let allItens			= document.querySelectorAll("#unidades .row");
		idNumber			= 1;
			
		allItens.forEach(function (element, index) {
			console.log(element);
			element.id = 'unidade-' + idNumber;
			
			element.querySelector('.input-estado').parentElement.querySelector('label').setAttribute('for', 'estado-' + idNumber);
			element.querySelector('.input-estado').parentElement.querySelector('label').id = 'estado-' + idNumber;
			element.querySelector('.input-estado').id = 'estado-' + idNumber;
			element.querySelector('.input-estado').name = 'estado-' + idNumber;
			element.querySelector('.input-estado').setAttribute('data-name', 'estado-' + idNumber);
//			element.querySelector('.input-estado').value = '';
			
			element.querySelector('.input-cidade').parentElement.querySelector('label').setAttribute('for', 'cidade-' + idNumber);
			element.querySelector('.input-cidade').parentElement.querySelector('label').id = 'cidade-' + idNumber;
			element.querySelector('.input-cidade').id = 'cidade-' + idNumber;
			element.querySelector('.input-cidade').name = 'cidade-' + idNumber;
			element.querySelector('.input-cidade').setAttribute('data-name', 'cidade-' + idNumber);
//			element.querySelector('.input-cidade').value = '';
			
			element.querySelector('.input-vidas').id = 'vidas-' + idNumber;
			element.querySelector('.input-vidas').name = 'vidas-' + idNumber;
			element.querySelector('.input-vidas').setAttribute('data-name','vidas-' + idNumber);
//			element.querySelector('.input-vidas').value = '';
			
			idNumber++;
		});
		
		getInputs();
        ativaAvancar();
        resizear();
		atualizaVidas();
	};
	
	function atualizaVidas() {
		let allIinputVidas		= oSlider.querySelectorAll('.input-vidas');
		let totalAllVidas		= 0;
		
		allIinputVidas.forEach(function (element, index) {
			totalAllVidas += Number(element.value);
		});
		
		inputTotalVidas.value = parseInt(totalAllVidas);
	};
	
	
	oSlider.addEventListener('input', function onInput(event) {
		if (event.target.id == 'cnpj') {
			var x = event.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
		    event.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');
		};
		if (event.target.classList.contains('input-estado')) { setMunicipios(event.target);	};
		if (event.target.classList.contains('input-vidas')) { atualizaVidas(); };
		console.log('ddddddd');
	});
	
	
	oSlider.addEventListener('click', function onClick(event) {
		console.log('event.target: ' + event.target);
	    console.log('event.target.id: ' + event.target.id);
	    console.log('event.target.type: ' + event.target.type);
		
	    if (event.target.id == 'comecar') { event.preventDefault(); nextSlide.click(); changeSlide(); };
	    if (event.target.classList.contains('bt-avancar')) { event.preventDefault(); nextSlide.click(); changeSlide(); };
	    if (event.target.classList.contains('bt-voltar')) { event.preventDefault(); prevSlide.click(); changeSlide(); };
	    
	    if (event.target.classList.contains('add-unidade')) {
	        const node = event.target.closest('.row');
	        const clone = node.cloneNode(true);
			clone.querySelector('.input-vidas').value = "";
			clone.querySelector('.input-cidade').innerHTML = '<option value="">Aguarde…</option>';
	        document.querySelector("#unidades").appendChild(clone);			
			renameInputs();
	    };
	
	    if (event.target.classList.contains('remove-unidade')) {
	        const node = event.target.closest('.row').remove();
			renameInputs();
	    };
		
		if (event.target.classList.contains('w-tab-link')) { setTimeout(function () { resizear(); }, 300) };
	});
	
	window.addEventListener('resize', function onResize(event) { resizear(); }, true);
	
	setTimeout(function () {
		setEstados();
	    resizear();
	    getInputs();
		console.log('sssss')
	}, 200)
    