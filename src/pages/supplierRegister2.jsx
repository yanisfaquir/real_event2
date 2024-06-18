import React, { useState, useEffect } from 'react';
import GlobalButton from '@/components/globalButton';
import { FaChevronDown } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Select from 'react-select';

const SupplierRegister = () => {
    const [serviceName, setServiceName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
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
    const [service, setService] = useState('');

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
        console.log({
            serviceName,
            selectedUniqueOptionDJ,
            uniqueOptionsCatering,
            selectedMultiOption1,
            shortText,
            longText,
            service,
        });
    };
    useEffect(() => {

        if (router.query && router.query.service) {
            setService(router.query.service);
            console.log(router.query.service);
        }
    }, [router.query]);


    return (
        <div className="flex justify-center items-center h-screen mt-10">
            <div className="text-left mt-10 ml-20">
                <h1 className='font-medium text-3xl mb-4 mt-10'>INFORMAÇÕES - {service} </h1>
                <p className='text-base mb-8'>Queremos saber mais sobre o teu serviço de forma a conseguirmos partilhar com os nossos utilizadores.</p>

                {service === 'Catering' && (

                    <div>
                        <form onSubmit={handleSubmit} style={{
                            maxWidth: '1200px', margin: '0 auto', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center'
                        }}>
                            {/* Linha 1 */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                                <div style={{ width: '48%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nome do Serviço:</label>
                                    <input
                                        type="text"
                                        value={serviceName}
                                        onChange={(e) => setServiceName(e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    />
                                </div>
                                <div style={{ width: '48%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Tipo de Refeições:</label>
                                    <input
                                        type="text"
                                        value={shortText}
                                        onChange={(e) => setShortText(e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    />
                                </div>

                            </div>
                            {/* Linha 2 */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                                <div style={{ width: '48%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Localização:</label>
                                    <Select
                                        options={uniqueOptionsDJ}
                                        value={selectedUniqueOptionDJ}
                                        onChange={setSelectedUniqueOptionDJ}
                                    />
                                </div>
                                <div style={{ width: '48%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Tipo de comida:</label>
                                    <Select
                                        options={uniqueOptionsCatering}
                                        value={selectedUniqueOptionsCatering}
                                        onChange={setSelectedUniqueOptionsCatering}
                                    />
                                </div>
                            </div>
                            {/* Linha 3 */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                                <div style={{ width: '48%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Capacidade mínima de pessoas:</label>
                                    <input
                                        type="text"
                                        value={shortText}
                                        onChange={(e) => setShortText(e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    />
                                </div>
                                <div style={{ width: '48%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Capacidade máxima de pessoas:</label>
                                    <input
                                        type="text"
                                        value={shortText}
                                        onChange={(e) => setShortText(e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    />
                                </div>
                            </div>
                            {/* Linha 2 */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                     
                                <div style={{ width: '100%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Preço do menu</label>
                                    <input
                                        type="text"
                                        value={shortText}
                                        onChange={(e) => setShortText(e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    />
                                </div>
                            </div>
                            {/* Linha 4 */}
                            <div style={{ width: '100%', marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Breve descrição dos menu:</label>
                                <textarea
                                    value={longText}
                                    onChange={(e) => setLongText(e.target.value)}
                                    style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
                                ></textarea>
                            </div>
                        </form>
                    </div>
                )}


                {service === 'Merchandising' && (

                    <div>
                        <form onSubmit={handleSubmit} style={{
                            maxWidth: '1200px', margin: '0 auto', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center'
                        }}>
                            {/* Linha 1 */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                                <div style={{ width: '100%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nome do Serviço:</label>
                                    <input
                                        type="text"
                                        value={serviceName}
                                        onChange={(e) => setServiceName(e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    />
                                </div>
                            </div>
                            {/* Linha 2 */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                                <div style={{ width: '48%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Localização:</label>
                                    <Select
                                        options={uniqueOptionsDJ}
                                        value={selectedUniqueOptionDJ}
                                        onChange={setSelectedUniqueOptionDJ}
                                    />
                                </div>
                                <div style={{ width: '48%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Produtos disponíveis:</label>
                                    <Select
                                        isMulti
                                        options={objMerchandising}
                                        value={selectedObjMerchandising}
                                        onChange={setSelectedObjMerchandising}
                                    />
                                </div>
                            </div>
                            {/*{selectedMultiOption1.length > 0 && (
                                
                            )} */} 
                            {/* Linha 3 */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                                <div style={{ width: '48%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Capacidade mínima por produto:</label>
                                    <input
                                        type="text"
                                        value={shortText}
                                        onChange={(e) => setShortText(e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    />
                                </div>
                                <div style={{ width: '48%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Capacidade máxima por produto:</label>
                                    <input
                                        type="text"
                                        value={shortText}
                                        onChange={(e) => setShortText(e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    />
                                </div>
                            </div>
                            {/* Linha 2 */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                                <div style={{ width: '100%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Métodos de entrega disponiveis:</label>
                                    <Select
                                        isMulti
                                        options={metodoEntrega}
                                        value={selectedMetodoEntrega}
                                        onChange={setSelectedMetodoEntrega}
                                    />
                                </div>
                            </div>
                            {/* Linha 4 */}
                            <div style={{ width: '100%', marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Breve descrição dos menus:</label>
                                <textarea
                                    value={longText}
                                    onChange={(e) => setLongText(e.target.value)}
                                    style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
                                ></textarea>
                            </div>
                        </form>
                    </div>
                )}



                {service === 'DJ' && (
                    <div>
                        <form onSubmit={handleSubmit} style={{
                            maxWidth: '1200px', margin: '0 auto', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center'
                        }}>
                            {/* Linha 1 */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                                <div style={{ width: '48%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nome do Serviço:</label>
                                    <input
                                        type="text"
                                        value={serviceName}
                                        onChange={(e) => setServiceName(e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    />
                                </div>
                                <div style={{ width: '48%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Tipo de música:</label>
                                    <input
                                        type="text"
                                        value={shortText}
                                        onChange={(e) => setShortText(e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    />
                                </div>

                            </div>
                            {/* Linha 2 */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                                <div style={{ width: '48%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Localização:</label>
                                    <Select
                                        options={uniqueOptionsDJ}
                                        value={selectedUniqueOptionDJ}
                                        onChange={setSelectedUniqueOptionDJ}
                                    />
                                </div>
                                <div style={{ width: '48%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Equipamentos disponíveis:</label>
                                    <Select
                                        isMulti
                                        options={multiOptionsDJ}
                                        value={selectedMultiOption1}
                                        onChange={setSelectedMultiOption1}
                                    />
                                </div>
                            </div>
                            {/* Linha 3 */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>

                                <div style={{ width: '100%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Preço por hora:</label>
                                    <input
                                        type="text"
                                        value={shortText}
                                        onChange={(e) => setShortText(e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    />
                                </div>
                            </div>
                            {/* Linha 4 */}
                            <div style={{ width: '100%', marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Breve descrição:</label>
                                <textarea
                                    value={longText}
                                    onChange={(e) => setLongText(e.target.value)}
                                    style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
                                ></textarea>
                            </div>
                        </form>
                    </div>
                )}


                {service === 'Espaço' && (
                    <div>
                        <form onSubmit={handleSubmit} style={{
                            maxWidth: '1200px', margin: '0 auto', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center'
                        }}>
                            {/* Linha 1 */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                                <div style={{ width: '48%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nome do Serviço:</label>
                                    <input
                                        type="text"
                                        value={serviceName}
                                        onChange={(e) => setServiceName(e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    />
                                </div>
                                <div style={{ width: '48%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Tipo de espaço:</label>
                                    <input
                                        type="text"
                                        value={shortText}
                                        onChange={(e) => setShortText(e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    />
                                </div>

                            </div>
                            {/* Linha 2 */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                                <div style={{ width: '48%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Localização:</label>
                                    <Select
                                        options={uniqueOptionsDJ}
                                        value={selectedUniqueOptionDJ}
                                        onChange={setSelectedUniqueOptionDJ}
                                    />
                                </div>
                                <div style={{ width: '48%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Equipamentos disponíveis:</label>
                                    <Select
                                        isMulti
                                        options={multiOptionsDJ}
                                        value={selectedMultiOption1}
                                        onChange={setSelectedMultiOption1}
                                    />
                                </div>
                            </div>
                            {/* Linha 3 */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                                <div style={{ width: '48%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Capacidade máxima de pessoas:</label>
                                    <input
                                        type="text"
                                        value={shortText}
                                        onChange={(e) => setShortText(e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    />
                                </div>
                                <div style={{ width: '48%' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Preço por dia:</label>
                                    <input
                                        type="text"
                                        value={shortText}
                                        onChange={(e) => setShortText(e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    />
                                </div>
                            </div>
                            {/* Linha 4 */}
                            <div style={{ width: '100%', marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Breve descrição:</label>
                                <textarea
                                    value={longText}
                                    onChange={(e) => setLongText(e.target.value)}
                                    style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
                                ></textarea>
                            </div>
                        </form>
                    </div>

                )}



                {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}

                <div className='flex justify-center mr-10'>
                    <GlobalButton
                        size="small"
                        type="primary"
                        onClick={handleSubmit}
                        text="Seguinte"
                    />



                </div>

            </div>
        </div>
    );
};

export default SupplierRegister;
