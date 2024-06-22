import React, { useState, useEffect, useContext } from 'react';
import GlobalButton from '@/components/globalButton';
import { FaChevronDown } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Select from 'react-select';
import { AccessibilityContext } from '@/contexts/acessibility';
import { useSelector } from 'react-redux';

const SupplierRegister = () => {
    const { alignment, highContrast } = useContext(AccessibilityContext);
    const [serviceName, setServiceName] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [capacity, setCapacity] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    
    const [isOpenLocalidade, setIsOpenLocalidade] = useState(false);
    const [isOpenTipoComida, setIsOpenTipoComida] = useState(false);
    const [isOpenPreco, setIsOpenPreco] = useState(false);
    const [selectedUniqueOptionDJ, setSelectedUniqueOptionDJ] = useState('');
    const [selectedUniqueOptionsCatering, setSelectedUniqueOptionsCatering] = useState('');
    const [selectedObjMerchandising, setSelectedObjMerchandising] = useState('');
    const [selectedMetodoEntrega, setSelectedMetodoEntrega] = useState('');
    const [selectedMultiOption1, setSelectedMultiOption1] = useState([]);
    const [shortText, setShortText] = useState('');
    const [longText, setLongText] = useState('');
    const serviceType_ = useSelector((state) => state.event.serviceType);
    const [serviceType, setServiceType] = useState(serviceType_);

    const uniqueOptionsDJ = [
        { value: 'Aveiro', label: 'Aveiro' },
        { value: 'Beja', label: 'Beja' },
        { value: 'Braga', label: 'Braga' },
        { value: 'Bragança', label: 'Bragança' },
        { value: 'Castelo Branco', label: 'Castelo Branco' },
        { value: 'Coimbra', label: 'Coimbra' },
        { value: 'Évora', label: 'Évora' },
        { value: 'Faro', label: 'Faro' },
        { value: 'Guarda', label: 'Guarda' },
        { value: 'Leiria', label: 'Leiria' },
        { value: 'Lisboa', label: 'Lisboa' },
        { value: 'Portalegre', label: 'Portalegre' },
        { value: 'Porto', label: 'Porto' },
        { value: 'Santarém', label: 'Santarém' },
        { value: 'Setúbal', label: 'Setúbal' },
        { value: 'Viana do Castelo', label: 'Viana do Castelo' },
        { value: 'Vila Real', label: 'Vila Real' },
        { value: 'Viseu', label: 'Viseu' },
    ];

    const multiOptionsDJ = [
        { value: 'Mesa de som', label: 'Mesa de som' },
        { value: 'Cabos', label: 'Cabos' },
        { value: 'PC', label: 'PC' },
        { value: 'Colunas', label: 'Colunas' },
    ];

    const uniqueOptionsCatering = [
        { value: 'Italiana', label: 'Italiana' },
        { value: 'Chinesa', label: 'Chinesa' },
        { value: 'Japonesa', label: 'Japonesa' },
        { value: 'Indiana', label: 'Indiana' },
        { value: 'Tailândesa', label: 'Tailândesa' },
    ];

    const objMerchandising = [
        { value: 'Canetas', label: 'Canetas' },
        { value: 'Lápis', label: 'Lápis' },
        { value: 'Camisolas', label: 'Camisolas' },
        { value: 'Canecas', label: 'Canecas' },
    ];

    const metodoEntrega = [
        { value: 'Em loja', label: 'Em loja' },
        { value: 'Envio por correio', label: 'Envio por correio' },
    ];

    const multiOptionsCatering = [
        { value: 'A', label: 'A' },
        { value: 'b', label: 'b' },
        { value: 'C', label: 'C' },
    ];

    const tipoComida = ['Italiana', 'Portuguesa', 'Mexicana', 'Tailandesa'];
    const precoCatering = ['100€ - 500€', '500€ - 1000€', '1000€ - 5000€', 'Mais de 5000€ '];

    const [selectedLocalidade, setSelectedLocalidade] = useState('');
    const [selectedTipoComida, setSelectedTipoComida] = useState('');
    const [selectedPreco, setSelectedPreco] = useState('');
    // const [service, setService] = useState('');

    const router = useRouter();

    const handleToggleDropdownLocalidade = () => {
        setIsOpenLocalidade(!isOpenLocalidade);
    };

    const handleToggleDropdownTipoComida = () => {
        setIsOpenTipoComida(!isOpenTipoComida);
    };

    const handleToggleDropdownPreco = () => {
        setIsOpenPreco(!isOpenPreco);
    };

    const handleSelectLocalidade = (value) => {
        setSelectedLocalidade(value);
        handleToggleDropdownLocalidade();
    };

    const handleSelectTipoComida = (value) => {
        setSelectedTipoComida(value);
        setIsOpenTipoComida(!isOpenTipoComida);
    };

    const handleSelectPreco = (value) => {
        setSelectedPreco(value);
        setIsOpenPreco(!isOpenPreco);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isButtonDisabled) return;
        console.log({
            serviceName,
            postalCode,
            capacity,
            selectedUniqueOptionDJ,
            uniqueOptionsCatering,
            selectedMultiOption1,
            shortText,
            longText,
            serviceType
        });
    };

    useEffect(() => {
        if (router.query && router.query.service) {
            setServiceType(router.query.service);
        }
    }, [router.query]);

    useEffect(() => {
        const allFieldsFilled = serviceName && postalCode && capacity;
        setIsButtonDisabled(!allFieldsFilled);
    }, [serviceName, postalCode, capacity]);

    return (
        <div className="mt-20 container mx-auto px-4">
            <section className="mb-10">
                <p
                    className={`flex flex-col pt-20 px-5 text-[3rem] font-bold text-middle-home text-gray-900`}
                    style={{ textAlign: `${alignment ? alignment : 'start'}` }}
                >
                    INFORMAÇÕES - {serviceType}
                </p>
                <p
                    className={`relative max-w-[90vw] px-5 mb-4 text-[1.2rem]`}
                    style={{ textAlign: `${alignment ? alignment : 'start'}` }}
                >
                    Queremos saber mais sobre o teu serviço de forma a conseguirmos partilhar com os nossos utilizadores.
                </p>
            </section>
               
            {serviceType === 'Catering' && (
                <form onSubmit={handleSubmit} className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                        <label className="mb-1">Nome do serviço:</label>
                        <input
                            type="text"
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                            className="p-2 border rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1">Código Postal:</label>
                        <input
                            type="text"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="p-2 border rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1">Capacidade de pessoas:</label>
                        <select
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            className="p-2 border rounded"
                        >
                            <option value="">Todos</option>
                            <option value="10-50">10-50</option>
                            <option value="51-100">51-100</option>
                            <option value="101-200">101-200</option>
                            <option value="200+">200+</option>
                        </select>
                    </div>
                </form>
            )}

            {serviceType === 'Merchandising' && (
                <form onSubmit={handleSubmit} className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                        <label className="mb-1">Nome do serviço:</label>
                        <input
                            type="text"
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                            className="p-2 border rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1">Código Postal:</label>
                        <input
                            type="text"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="p-2 border rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1">Capacidade de pessoas:</label>
                        <select
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            className="p-2 border rounded"
                        >
                            <option value="">Todos</option>
                            <option value="10-50">10-50</option>
                            <option value="51-100">51-100</option>
                            <option value="101-200">101-200</option>
                            <option value="200+">200+</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1">Escolha um tipo de comida:</label>
                        <Select
                            isOpen={isOpenTipoComida}
                            onToggle={handleToggleDropdownTipoComida}
                            value={selectedTipoComida}
                            onChange={handleSelectTipoComida}
                            options={tipoComida.map((comida) => ({
                                value: comida,
                                label: comida,
                            }))}
                            className="p-2 border rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1">Escolha um preço:</label>
                        <Select
                            isOpen={isOpenPreco}
                            onToggle={handleToggleDropdownPreco}
                            value={selectedPreco}
                            onChange={handleSelectPreco}
                            options={precoCatering.map((preco) => ({
                                value: preco,
                                label: preco,
                            }))}
                            className="p-2 border rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1">Método de entrega:</label>
                        <Select
                            value={selectedMetodoEntrega}
                            onChange={(selectedOption) => setSelectedMetodoEntrega(selectedOption)}
                            options={metodoEntrega}
                            className="p-2 border rounded"
                        />
                    </div>
                </form>
            )}

            {serviceType === 'DJ' && (
                <form onSubmit={handleSubmit} className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                        <label className="mb-1">Nome do serviço:</label>
                        <input
                            type="text"
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                            className="p-2 border rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1">Código Postal:</label>
                        <input
                            type="text"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="p-2 border rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1">Capacidade de pessoas:</label>
                        <select
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            className="p-2 border rounded"
                        >
                            <option value="">Todos</option>
                            <option value="10-50">10-50</option>
                            <option value="51-100">51-100</option>
                            <option value="101-200">101-200</option>
                            <option value="200+">200+</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1">Localidade:</label>
                        <Select
                            value={selectedUniqueOptionDJ}
                            onChange={(selectedOption) => setSelectedUniqueOptionDJ(selectedOption)}
                            options={uniqueOptionsDJ}
                            className="p-2 border rounded"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1">Equipamento:</label>
                        <Select
                            isMulti
                            value={selectedMultiOption1}
                            onChange={(selectedOptions) => setSelectedMultiOption1(selectedOptions)}
                            options={multiOptionsDJ}
                            className="p-2 border rounded"
                        />
                    </div>
                </form>
            )}

            {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}

            <div className='flex justify-center mr-10 mb-10'>
                <GlobalButton
                    size="medium"
                    type="primary"
                    disabled={isButtonDisabled}
                    // path="/supplierRegister3"
                    text="Submeter"
                />
            </div>
        </div>
    );
};

export default SupplierRegister;
