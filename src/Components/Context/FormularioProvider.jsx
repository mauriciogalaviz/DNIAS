import { createContext } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { DataContext } from './DataProvider';
import { useContext } from 'react';
import { UtilsContext } from './UtilsProvider';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
//import { LoginContext } from './LoginProvider';
const FormularioContext = createContext();

const FormularioProvider = ({ children }) => {
	//const { headerList, setNavModule } = useContext(DataContext);
	const { /* setOpenBackDrop, */ SnackbarData, setSnackbarData, setDialogData, DialogData, DiologOnClose } = useContext(UtilsContext);
	//const { UserLogIn } = useContext(LoginContext);
	const [activeButton, setActiveButton] = useState({
		active: -1,
		subActive: -1,
	});
	const [activeButtonMenu, setActiveButtonMenu] = useState({
		active: -1,
		subActive: -1,
	});
	const [ListView, setListView] = useState(null);
	const [BotoneraForm, setBotoneraForm] = useState(true);
	/////////////////////////////
	// Formulario Variables Institución
	const [IdInstitucion, setIdInstitucion] = useState(1);
	const [TipoInstitucion, setTipoInstitucion] = useState(0);
	const [TipoServicioInstitucion, setTipoServicioInstitucion] = useState(0);
	const [TipoRegistro, setTipoRegistro] = useState(0);
	// Formulario Tipo Institución
	const [FormTipoInstitucion, setFormTipoInstitucion] = useState({
		initialValues: {
			id_institucion: IdInstitucion,
			tipo_registro: null,
			tipo_institucion: null,
			rfc_institucion: null,
			razon_social: null,
			siglas_institucion: null,
			tipo_servicio: null,
		},
		data: {
			id_institucion: IdInstitucion,
			tipo_registro: null,
			tipo_institucion: null,
			rfc_institucion: null,
			razon_social: null,
			siglas_institucion: null,
			tipo_servicio: null,
		},
	});
	// Formulario Datos de institución y domicilio social
	const [FormDomicilio, setFormDomicilio] = useState({
		initialValues: {
			id_institucion: IdInstitucion,
			cluni: null,
			tipo_organizacion: null,
			anios_servicio: null,
			vialidad: null,
			calle: null,
			num_ext: null,
			num_int: null,
			entre_calle1: null,
			entre_calle2: null,
			cp: null,
			id_entidad: null,
			id_municipio: null,
			id_asentamiento: null,
			telefono1: null,
			telefono2: null,
			telefono3: null,
			correo_institucion: null,
			web: null,
			redes: null,
			lat: '23.6345',
			lng: '-102.5528',
			nombre_responsable: null,
			pa_responsable: null,
			sa_responsble: null,
			telefono1_responsable: null,
			telefono2_responsable: null,
			celular_responsable: null,
			identificacion_responsable: null,
			folio_responsable: null,
			fecha_expedicion_responsable: null,
		},
		data: {
			id_institucion: IdInstitucion,
			cluni: null,
			tipo_organizacion: null,
			anios_servicio: null,
			vialidad: null,
			calle: null,
			num_ext: null,
			num_int: null,
			entre_calle1: null,
			entre_calle2: null,
			cp: null,
			id_entidad: null,
			id_municipio: null,
			id_asentamiento: null,
			telefono1: null,
			telefono2: null,
			telefono3: null,
			correo_institucion: null,
			web: null,
			redes: null,
			lat: '23.6345',
			lng: '-102.5528',
			nombre_responsable: null,
			pa_responsable: null,
			sa_responsble: null,
			telefono1_responsable: null,
			telefono2_responsable: null,
			celular_responsable: null,
			identificacion_responsable: null,
			folio_responsable: null,
			fecha_expedicion_responsable: null,
		},
	});
	// Formulario Datos legales
	const [FormDatosLegales, setFormDatosLegales] = useState({
		initialValues: {
			id_institucion: IdInstitucion,
			nombre_notario: null,
			numero_notaria: null,
			acta_constitutiva: null,
			acta_constitutiva_lugar: null,
			acta_constitutiva_fecha: null,
			figura_juridica: null,
			nombre_documento: null,
			numero_documento: null,
			documento_lugar: null,
			documento_fecha: null,
			naturaleza_juridica: null,
			direccion_legal: null,
			vialidad: null,
			calle: null,
			num_ext: null,
			num_int: null,
			entre_calle1: null,
			entre_calle2: null,
			cp: null,
			id_entidad: null,
			id_municipio: null,
			entidad: null,
			municipio: null,
			colonia: null,
			telefono1: null,
			correo: null,
			web: null,
			redes: null,
			representante_legal: null,
		},
		data: {
			id_institucion: IdInstitucion,
			nombre_notario: null,
			numero_notaria: null,
			acta_constitutiva: null,
			acta_constitutiva_lugar: null,
			acta_constitutiva_fecha: null,
			figura_juridica: null,
			nombre_documento: null,
			numero_documento: null,
			documento_lugar: null,
			documento_fecha: null,
			naturaleza_juridica: null,
			direccion_legal: null,
			vialidad: null,
			calle: null,
			num_ext: null,
			num_int: null,
			entre_calle1: null,
			entre_calle2: null,
			cp: null,
			id_entidad: null,
			id_municipio: null,
			entidad: null,
			municipio: null,
			colonia: null,
			telefono1: null,
			correo: null,
			web: null,
			redes: null,
			representante_legal: null,
		},
	});
	const [FormRepresentanteLegal, setFormRepresentanteLegal] = useState({
		initialValues: {
			id_institucion: IdInstitucion,
			nombre_responsable: null,
			pa_responsable: null,
			sa_responsable: null,
			telefono1_responsable: null,
			telefono2_responsable: null,
			celular_responsable: null,
			identificacion_responsable: null,
			folio_responsable: null,
			fecha_expedicion_responsable: null,
		},
		data: {
			id_institucion: IdInstitucion,
			nombre_responsable: null,
			pa_responsable: null,
			sa_responsable: null,
			telefono1_responsable: null,
			telefono2_responsable: null,
			celular_responsable: null,
			identificacion_responsable: null,
			folio_responsable: null,
			fecha_expedicion_responsable: null,
		},
	});
	// Formulario Datos de servicios
	const [FormDatosServicios, setFormDatosServicios] = useState({
		initialValues: {
			id_institucion: IdInstitucion,
			objeto_social: null,
			poblacion_objetivo_1: false,
			cantidad_H_1: 0,
			cantidad_M_1: 0,
			poblacion_objetivo_2: false,
			cantidad_H_2: 0,
			cantidad_M_2: 0,
			poblacion_objetivo_3: false,
			cantidad_H_3: 0,
			cantidad_M_3: 0,
			poblacion_objetivo_4: false,
			cantidad_H_4: 0,
			cantidad_M_4: 0,
			familias: false,
			familias_cantidad: 0,
			apoyo_otras: false,
			apoyo_otras_cantidad: 0,
			investigacion: false,
			investigacion_describe: null,
			cantidad_localidades: null,
			cantidad_colonias: null,
			cantidad_personas: null,
		},
		data: {
			id_institucion: IdInstitucion,
			objeto_social: null,
			poblacion_objetivo_1: false,
			cantidad_H_1: 0,
			cantidad_M_1: 0,
			poblacion_objetivo_2: false,
			cantidad_H_2: 0,
			cantidad_M_2: 0,
			poblacion_objetivo_3: false,
			cantidad_H_3: 0,
			cantidad_M_3: 0,
			poblacion_objetivo_4: false,
			cantidad_H_4: 0,
			cantidad_M_4: 0,
			familias: false,
			familias_cantidad: 0,
			apoyo_otras: false,
			apoyo_otras_cantidad: 0,
			investigacion: false,
			investigacion_describe: null,
			cantidad_localidades: null,
			cantidad_colonias: null,
			cantidad_personas: null,
		},
	});
	const [FormCoberturaGeo, setFormCoberturaGeo] = useState({
		initialValues: {
			id_institucion: IdInstitucion,
			entidad: null,
			municipio: null,
		},
		data: {
			id_institucion: IdInstitucion,
			entidad: null,
			municipio: null,
		},
	});
	// Formulario asistencia Social
	const [FormAsistenciaSocial, setFormAsistenciaSocial] = useState({
		initialValues: {
			id_institucion: IdInstitucion,
			punto_0: false,
			punto_0_relevante: false,
			punto_1: false,
			punto_1_relevante: false,
			punto_2: false,
			punto_2_relevante: false,
			punto_3: false,
			punto_3_relevante: false,
			punto_4: false,
			punto_4_relevante: false,
			punto_5: false,
			punto_5_relevante: false,
			punto_6: false,
			punto_6_relevante: false,
			punto_7: false,
			punto_7_relevante: false,
			punto_8: false,
			punto_8_relevante: false,
			punto_9: false,
			punto_9_relevante: false,
			punto_10: false,
			punto_10_relevante: false,
			punto_11: false,
			punto_11_relevante: false,
			punto_12: false,
			punto_12_relevante: false,
			punto_13: false,
			punto_13_relevante: false,
			punto_14: false,
			punto_14_relevante: false,
			punto_15: false,
			punto_15_relevante: false,
			punto_16: false,
			punto_16_relevante: false,
			punto_17: false,
			punto_17_relevante: false,
			punto_18: false,
			punto_18_relevante: false,
			punto_19: false,
			punto_19_relevante: false,
			punto_20: false,
			punto_20_relevante: false,
			punto_21: false,
			punto_21_relevante: false,
			punto_22: false,
			punto_22_relevante: false,
			punto_23: false,
			punto_23_relevante: false,
			punto_24: false,
			punto_24_relevante: false,
			punto_25: false,
			punto_25_relevante: false,
			/* punto_26: false,
			punto_26_relevante: false,
			punto_27: false,
			punto_27_relevante: false,
			punto_28: false,
			punto_28_relevante: false, */
			discapacidad_motriz: false,
			discapacidad_visual: false,
			discapacidad_auditiva: false,
			discapacidad_intelectual: false,
			discapacidad_psicosocial: false,
			discapacidad_neurodiversa: false,
			discapacidad_multiple: false,
		},
		data: {
			id_institucion: IdInstitucion,
			punto_0: false,
			punto_0_relevante: false,
			punto_1: false,
			punto_1_relevante: false,
			punto_2: false,
			punto_2_relevante: false,
			punto_3: false,
			punto_3_relevante: false,
			punto_4: false,
			punto_4_relevante: false,
			punto_5: false,
			punto_5_relevante: false,
			punto_6: false,
			punto_6_relevante: false,
			punto_7: false,
			punto_7_relevante: false,
			punto_8: false,
			punto_8_relevante: false,
			punto_9: false,
			punto_9_relevante: false,
			punto_10: false,
			punto_10_relevante: false,
			punto_11: false,
			punto_11_relevante: false,
			punto_12: false,
			punto_12_relevante: false,
			punto_13: false,
			punto_13_relevante: false,
			punto_14: false,
			punto_14_relevante: false,
			punto_15: false,
			punto_15_relevante: false,
			punto_16: false,
			punto_16_relevante: false,
			punto_17: false,
			punto_17_relevante: false,
			punto_18: false,
			punto_18_relevante: false,
			punto_19: false,
			punto_19_relevante: false,
			punto_20: false,
			punto_20_relevante: false,
			punto_21: false,
			punto_21_relevante: false,
			punto_22: false,
			punto_22_relevante: false,
			punto_23: false,
			punto_23_relevante: false,
			punto_24: false,
			punto_24_relevante: false,
			punto_25: false,
			punto_25_relevante: false,
			/* punto_26: false,
			punto_26_relevante: false,
			punto_27: false,
			punto_27_relevante: false,
			punto_28: false,
			punto_28_relevante: false, */
			discapacidad_motriz: false,
			discapacidad_visual: false,
			discapacidad_auditiva: false,
			discapacidad_intelectual: false,
			discapacidad_psicosocial: false,
			discapacidad_neurodiversa: false,
			discapacidad_multiple: false,
		},
	});
	// Formulario Servicios Salud
	const [FormServiciosSalud, setFormServiciosSalud] = useState({
		initialValues: {
			id_institucion: IdInstitucion,
			servicio_salud_0: false,
			servicio_salud_1: false,
			servicio_salud_2: false,
			servicio_salud_3: false,
			servicio_salud_4: false,
			servicio_salud_5: false,
			servicio_salud_6: false,
			servicio_salud_7: false,
			servicio_salud_8: false,
			servicio_salud_9: false,
			servicio_salud_10: false,
			servicio_salud_11: false,
			enfermedades_cronicas: null,
		},
		data: {
			id_institucion: IdInstitucion,
			servicio_salud_0: false,
			servicio_salud_1: false,
			servicio_salud_2: false,
			servicio_salud_3: false,
			servicio_salud_4: false,
			servicio_salud_5: false,
			servicio_salud_6: false,
			servicio_salud_7: false,
			servicio_salud_8: false,
			servicio_salud_9: false,
			servicio_salud_10: false,
			servicio_salud_11: false,
			enfermedades_cronicas: null,
		},
	});
	// Formulario Recursos Humanos, infraestructura, recursos económicos y donativos
	const [FormRecursosHumanos, setFormRecursosHumanos] = useState({
		initialValues: {
			id_institucion: IdInstitucion,
			especialidad_0: null,
			licenciatura_0: null,
			carrera_tecnica_0: null,
			educacion_media_superior_0: null,
			educacion_basica_0: null,
			sin_instruccion_academica_0: null,
			especialidad_1: null,
			licenciatura_1: null,
			carrera_tecnica_1: null,
			educacion_media_superior_1: null,
			educacion_basica_1: null,
			sin_instruccion_academica_1: null,
			especialidad_2: null,
			licenciatura_2: null,
			carrera_tecnica_2: null,
			educacion_media_superior_2: null,
			educacion_basica_2: null,
			sin_instruccion_academica_2: null,
			capacitacion_asistencia_social: null,
			institucion_asistencia_social: null,
			objeto_social: null,
			institucion_atender_poblacion: null,
			institucion_red_organizaciones: null,
			institucion_red_organizaciones_nombre: null,
			recursos_0: false,
			recursos_1: false,
			recursos_2: false,
			recursos_3: false,
			instituto_0: false,
			instituto_1: false,
			instituto_2: false,
			instituto_3: false,
			instituto_4: false,
			rubro_0: false,
			porcentaje_0: 0,
			rubro_1: false,
			porcentaje_1: 0,
			rubro_2: false,
			porcentaje_2: 0,
			rubro_3: false,
			porcentaje_3: 0,
			porcentaje_total: 0,
			recursos_donativos: null,
			donatario_autorizado: null,
			donatario_autorizado_clave: null,
			medios_0: false,
			medios_1: false,
			medios_2: false,
			medios_3: false,
			medios_4: false,
			medios_5: false,
			medios_6: false,
			medios_7: false,
			medios_8: false,
			medios_9: false,
			medios_10: false,
			medios_11: false,
			medios_12: false,
			medios_13: false,
		},
		data: {
			id_institucion: IdInstitucion,
			especialidad_0: null,
			licenciatura_0: null,
			carrera_tecnica_0: null,
			educacion_media_superior_0: null,
			educacion_basica_0: null,
			sin_instruccion_academica_0: null,
			especialidad_1: null,
			licenciatura_1: null,
			carrera_tecnica_1: null,
			educacion_media_superior_1: null,
			educacion_basica_1: null,
			sin_instruccion_academica_1: null,
			especialidad_2: null,
			licenciatura_2: null,
			carrera_tecnica_2: null,
			educacion_media_superior_2: null,
			educacion_basica_2: null,
			sin_instruccion_academica_2: null,
			capacitacion_asistencia_social: null,
			institucion_asistencia_social: null,
			objeto_social: null,
			institucion_atender_poblacion: null,
			institucion_red_organizaciones: null,
			institucion_red_organizaciones_nombre: null,
			recursos_0: false,
			recursos_1: false,
			recursos_2: false,
			recursos_3: false,
			instituto_0: false,
			instituto_1: false,
			instituto_2: false,
			instituto_3: false,
			instituto_4: false,
			rubro_0: false,
			porcentaje_0: 0,
			rubro_1: false,
			porcentaje_1: 0,
			rubro_2: false,
			porcentaje_2: 0,
			rubro_3: false,
			porcentaje_3: 0,
			porcentaje_total: 0,
			recursos_donativos: null,
			donatario_autorizado: null,
			donatario_autorizado_clave: null,
			medios_0: false,
			medios_1: false,
			medios_2: false,
			medios_3: false,
			medios_4: false,
			medios_5: false,
			medios_6: false,
			medios_7: false,
			medios_8: false,
			medios_9: false,
			medios_10: false,
			medios_11: false,
			medios_12: false,
			medios_13: false,
		},
	});
	const [FormRecursosHumanosInfra, setFormRecursosHumanosInfra] = useState({
		initialValues: {
			id_institucion: IdInstitucion,
			infra: null,
		},
		data: {
			id_institucion: IdInstitucion,
			infra: null,
		},
	});
	const [FormRecursosHumanosGobierno, setFormRecursosHumanosGobierno] = useState({
		initialValues: {
			id_institucion: IdInstitucion,
			institucion_gobierno_apoyo: null,
			nombre: null,
		},
		data: {
			id_institucion: IdInstitucion,
			institucion_gobierno_apoyo: null,
			nombre: null,
		},
	});
	// Formulario Documentacion y responsable de llenado
	const [FormDocumentacion, setFormDocumentacion] = useState({
		initialValues: {
			id_institucion: IdInstitucion,
			modelo_intervencion: null,
			nombre_captura: null,
			cargo_captura: null,
			fecha_captura: null,
		},
		data: {
			id_institucion: IdInstitucion,
			modelo_intervencion: null,
			nombre_captura: null,
			cargo_captura: null,
			fecha_captura: null,
		},
	});
	const [FormDocumentacionCarga, setFormDocumentacionCarga] = useState({
		initialValues: {
			id_institucion: IdInstitucion,
			tipo_archivo: null,
			archivo: [],
		},
		data: {
			id_institucion: IdInstitucion,
			tipo_archivo: null,
			archivo: [],
		},
	});
	// Formulario Dictamen
	const [FormularioDictamen, setFormularioDictamen] = useState({
		initialValues: {
			id_institucion: IdInstitucion,
			id_enlace: null,
			id_verificador: null,
			fecha_verificacion: null,
			c1_0: false,
			c1_1: false,
			c1_2: false,
			c1_3: false,
			c1_4: false,
			c1_5: false,
			c1_6: false,
			c2_0: false,
			c2_1: false,
			c2_2: false,
			c2_3: false,
			c2_4: false,
			c2_5: false,
			c2_6: false,
			c3_0: false,
			c4_0: false,
			c5_0: false,
			observaciones_infraestructura: null,
		},
		data: {
			id_institucion: IdInstitucion,
			id_enlace: null,
			id_verificador: null,
			fecha_verificacion: null,
			c1_0: false,
			c1_1: false,
			c1_2: false,
			c1_3: false,
			c1_4: false,
			c1_5: false,
			c1_6: false,
			c2_0: false,
			c2_1: false,
			c2_2: false,
			c2_3: false,
			c2_4: false,
			c2_5: false,
			c2_6: false,
			c3_0: false,
			c4_0: false,
			c5_0: false,
			observaciones_infraestructura: null,
		},
	});

	//////////////////////////////////
	// Carga Forms
	const CargaTipoInstitucion = async () => {
		console.log('CargaTipoInstitucion');
	};
	const CargaDatosDomicilio = async () => {
		console.log('CargaDatosDomicilio');
	};
	const CargaDatosLegales = async () => {
		console.log('CargaDatosLegales');
	};
	const CargaServiciosInstitucion = async () => {
		console.log('CargaServiciosInstitucion');
	};
	const CargaAsistenciaSocial = async () => {
		console.log('CargaAsistenciaSocial');
	};
	const CargaRecursosHumanos = async () => {
		console.log('CargaRecursosHumanos');
	};
	const CargaDocumentacion = async () => {
		console.log('CargaDocumentacion');
	};
	const CargaServiciosSalud = async () => {
		console.log('CargaServiciosSalud');
	};

	// Limpieza
	const ClearPreRegistro = async () => {
		setFormTipoInstitucion({
			...FormTipoInstitucion,
			data: FormTipoInstitucion.initialValues,
		});
		setFormDomicilio({
			...FormDomicilio,
			data: FormDomicilio.initialValues,
		});
		setFormDatosLegales({
			...FormDatosLegales,
			data: FormDatosLegales.initialValues,
		});
		setFormRepresentanteLegal({
			...FormRepresentanteLegal,
			data: FormRepresentanteLegal.initialValues,
		});
		setFormDatosServicios({
			...FormDatosServicios,
			data: FormDatosServicios.initialValues,
		});
		setFormCoberturaGeo({
			...FormCoberturaGeo,
			data: FormCoberturaGeo.initialValues,
		});
		setFormAsistenciaSocial({
			...FormAsistenciaSocial,
			data: FormAsistenciaSocial.initialValues,
		});
		setFormServiciosSalud({
			...FormServiciosSalud,
			data: FormServiciosSalud.initialValues,
		});
		setFormRecursosHumanos({
			...FormRecursosHumanos,
			data: FormRecursosHumanos.initialValues,
		});
		setFormRecursosHumanosInfra({
			...FormRecursosHumanosInfra,
			data: FormRecursosHumanosInfra.initialValues,
		});
		setFormDocumentacion({
			...FormDocumentacion,
			data: FormDocumentacion.initialValues,
		});
		setFormDocumentacionCarga({
			...FormDocumentacionCarga,
			data: FormDocumentacionCarga.initialValues,
		});
		setIdInstitucion(0);
		setTipoInstitucion(0);
	};
	// Change Estatus Registro
	const ChangeEstatus = (estatus) => {
		console.log('estatus enviado', estatus);
	};
	const ChangeEstatusCuestion = (estatus) => {
		const Cat_Estatus = [
			{ id: 1, name: 'ACTUALIZACIÓN ANUAL EN CAPTURA' },
			{ id: 2, name: 'ACTUALIZACIÓN ANUAL ENVIADA' },
			{ id: 3, name: 'ACTUALIZACIÓN ANUAL POR REVISIÓN ADMINISTRADOR CON VERIFICACIÓN' },
			{ id: 4, name: 'ACTUALIZACIÓN ANUAL POR REVISIÓN ADMINISTRADOR INSTITUCIÓN PÚBLICA' },
			{ id: 5, name: 'ACTUALIZACIÓN ANUAL POR REVISIÓN ADMINISTRADOR SIN VERIFICACIÓN' },
			{ id: 6, name: 'ACTUALIZACIÓN ANUAL POR VERIFICAR' },
			{ id: 7, name: 'ACTUALIZACIÓN ANUAL RECHAZADA POR ADMINISTRADOR' },
			{ id: 8, name: 'ACTUALIZACIÓN ANUAL RECHAZADA POR ENLACE ESTATAL' },
			{ id: 9, name: 'ACTUALIZACIÓN ANUAL RECHAZADA POR VERIFICADOR' },
			{ id: 10, name: 'ACTUALIZACIÓN ANUAL VERIFICADA' },
			{ id: 11, name: 'ACTUALIZACIÓN ANUAL POR REVISIÓN VERIFICADOR' },
			{ id: 12, name: 'CONSTANCIA DE ACTUALIZACIÓN ANUAL EMITIDA' },
			{ id: 13, name: 'CONSTANCIA EMITIDA' },
			{ id: 14, name: 'CONSTANCIA POR VENCER' },
			{ id: 15, name: 'CONSTANCIA VENCIDA' },
			{ id: 16, name: 'DICTAMEN DE ACTUALIZACIÓN ANUAL RECHAZADO POR ENLACE ESTATAL' },
			{ id: 17, name: 'DICTAMEN RECHAZADO POR ENLACE ESTATAL' },
			{ id: 18, name: 'FICHA DE SALUD EN CAPTURA' },
			{ id: 19, name: 'FICHA DE SALUD POR REVISIÓN ADMINISTRADOR DE SALUD' },
			{ id: 20, name: 'FICHA DE SALUD RECHAZADA POR ADMINISTRADOR DE SALUD' },
			{ id: 21, name: 'INSTITUCIÓN DE ASISTENCIA NO AUTORIZADA' },
			{ id: 22, name: 'INSTITUCIÓN DE ASISTENCIA NO AUTORIZADA DESDE ACTUALIZACIÓN ANUAL' },
			{ id: 23, name: 'INSTITUCIÓN DE SALUD NO AUTORIZADA' },
			{ id: 24, name: 'MEJOR PRÁCTICA AUTORIZADA' },
			{ id: 25, name: 'MEJOR PRÁCTICA EN CAPTURA' },
			{ id: 26, name: 'MEJOR PRÁCTICA POR REVISIÓN ENLACE INTERNO' },
			{ id: 27, name: 'MEJOR PRÁCTICA RECHAZADA POR ENLACE INTERNO' },
			{ id: 28, name: 'MODELO AUTORIZADO' },
			{ id: 29, name: 'MODELO EN CAPTURA' },
			{ id: 30, name: 'MODELO POR REVISIÓN ENLACE INTERNO' },
			{ id: 31, name: 'MODELO RECHAZADO' },
			{ id: 32, name: 'MODIFICACIÓN DE DATOS INSTITUCIÓN PÚBLICA' },
			{ id: 33, name: 'MODIFICACIÓN DE DATOS POR REVISIÓN ADMINISTRADOR DE SALUD' },
			{ id: 34, name: 'MODIFICACIÓN DE DATOS POR REVISIÓN ENLACE ESTATAL' },
			{ id: 35, name: 'MODIFICACIÓN DE FICHA DE SALUD POR REVISIÓN ADMINISTRADOR DE SALUD' },
			{ id: 36, name: 'NUEVA VERIFICACIÓN' },
			{ id: 37, name: 'NUEVA VERIFICACIÓN PARA ACTUALIZACIÓN ANUAL' },
			{ id: 38, name: 'ORGANIZACIONES DE LA SOCIEDAD CIVIL CON PERFIL' },
			{ id: 39, name: 'ORGANIZACIONES DE LA SOCIEDAD CIVIL SIN PERFIL' },
			{ id: 40, name: 'POR REVISIÓN ADMINISTRADOR CON VERIFICACIÓN' },
			{ id: 41, name: 'POR REVISIÓN ADMINISTRADOR DE SALUD' },
			{ id: 42, name: 'POR REVISIÓN ADMINISTRADOR INSTITUCIÓN PÚBLICA' },
			{ id: 43, name: 'POR REVISIÓN ADMINISTRADOR SIN VERIFICACIÓN' },
			{ id: 44, name: 'POR REVISIÓN DE VERIFICADOR' },
			{ id: 45, name: 'POR VERIFICAR' },
			{ id: 46, name: 'EN CAPTURA' },
			{ id: 47, name: 'ENVIADO' },
			{ id: 48, name: 'RECHAZADO POR ADMINISTRADOR' },
			{ id: 49, name: 'RECHAZADO POR ADMINISTRADOR DE SALUD' },
			{ id: 50, name: 'RECHAZADO POR ENLACE ESTATAL' },
			{ id: 51, name: 'RECHAZADO POR VERIFICADOR' },
			{ id: 52, name: 'PUBLICADO' },
			{ id: 53, name: 'VERIFICADO' },
			{ id: 54, name: 'CANCELACION LOGICA' },
		];
		const estat = Cat_Estatus.find((item) => item.id === estatus)?.name;
		setDialogData({
			...DialogData,
			open: true,
			title: 'Cambio de estatus',
			subtitle: 'Cambiar el registro de estatus',
			content: (
				<Box className="col-span-12 grid grid-cols-12 gap-4">
					<Typography className="col-span-12 text-2xl">Cambiar el registro al estatus de {estat}</Typography>
				</Box>
			),
			action: (
				<Box className="col-span-12 grid grid-cols-12 gap-4">
					<Button
						variant="contained"
						className="!bg-primary !text-white col-span-2"
						onClick={() => {
							ChangeEstatus(estatus);
						}}
					>
						Continuar
					</Button>
					<Button variant="contained" className="!bg-primary !text-white col-span-2" onClick={DiologOnClose}>
						Cerrar
					</Button>
				</Box>
			),
			maxWidth: 'sm',
		});
	};

	/////////////////////////////
	// FUNCTIONS
	const [geoCPColonias, setGeoCPColonias] = useState([]);
	const [IDEntidad, setIDEntidad] = useState();
	const [IDMunicipio, setIDMunicipio] = useState();
	const [Entidad, setEntidad] = useState(null);
	const [Municipio, setMunicipio] = useState(null);
	let codpost = async (cod) => {
		if (cod.length == 5) {
			let res = await fetch(`https://api.dif.gob.mx/geo/cp/callSepomex/${cod}`);
			let json = await res.json();
			return json;
		} else {
			return;
		}
	};
	const bringcod = async (cod) => {
		let json;
		console.log('cod.length', cod.length);
		if (cod.length == 5) {
			json = await codpost(cod);
			console.log(json.cp[0]);
			console.log(json.cp[0].estado);
			console.log(json.cp[0].municipio);
			setIDEntidad(json.cp[0].idEstado);
			setIDMunicipio(json.cp[0].idMunicipio);
			setEntidad(json.cp[0].estado);
			setMunicipio(json.cp[0].municipio);
		}
		return json;
	};
	const handleButtonClick = (index) => {
		setActiveButton(index);
		setListView(index);
	};
	// Control Errors
	const ErrorMessage = async (errors) => {
		let erno, datas;
		if (errors) {
			console.error('hay errores');
			datas = Object.keys(errors);
			console.log('datas', datas);
		}
		errors
			? ((erno = datas.map((err) => {
					console.log(err);
					return <Box>{err}</Box>;
			  })),
			  setSnackbarData({
					...SnackbarData,
					open: true,
					severity: 'error',
					content: <Box>Faltan campos : {erno}</Box>,
					duration: 6000,
			  }))
			: null;
	};
	/////////////////////////////
	// DATA
	const data = {
		BotoneraForm,
		setBotoneraForm,
		/////////////////////////////
		// Formulario Variables Institución
		IdInstitucion,
		setIdInstitucion,
		TipoInstitucion,
		setTipoInstitucion,
		TipoServicioInstitucion,
		setTipoServicioInstitucion,
		TipoRegistro,
		setTipoRegistro,
		// Formulario Tipo Institución
		FormTipoInstitucion,
		setFormTipoInstitucion,
		////////////////////////////
		// Formulario Datos de Institución y Domicilio Social/
		FormDomicilio,
		setFormDomicilio,
		////////////////////////////
		// Formulario Datos legales
		FormDatosLegales,
		setFormDatosLegales,
		FormRepresentanteLegal,
		setFormRepresentanteLegal,
		// Formulario de datos de servicio
		FormDatosServicios,
		setFormDatosServicios,
		FormCoberturaGeo,
		setFormCoberturaGeo,
		// Formulario Asistencia Social
		FormAsistenciaSocial,
		setFormAsistenciaSocial,
		// Formulario de Servicios de Salud
		FormServiciosSalud,
		setFormServiciosSalud,
		// Formulario Recursos Humanos, infraestructura, recursos económicos y donativos
		FormRecursosHumanos,
		setFormRecursosHumanos,
		FormRecursosHumanosInfra,
		setFormRecursosHumanosInfra,
		FormRecursosHumanosGobierno,
		setFormRecursosHumanosGobierno,
		// Formulario Documentación
		FormDocumentacion,
		setFormDocumentacion,
		FormDocumentacionCarga,
		setFormDocumentacionCarga,
		// Formulario Dictamen
		FormularioDictamen,
		setFormularioDictamen,
		////////////////////////////
		//Carga Forms
		CargaTipoInstitucion,
		CargaDatosDomicilio,
		CargaDatosLegales,
		CargaServiciosInstitucion,
		CargaAsistenciaSocial,
		CargaRecursosHumanos,
		CargaDocumentacion,
		CargaServiciosSalud,
		// Limpieza
		ClearPreRegistro,
		//Control Errors
		ErrorMessage,
		// Change Estatus Registro
		ChangeEstatus,
		ChangeEstatusCuestion,
		/////////////////////////////
		/////////////////////////////

		/////////////////////////////
		/////////////////////////////
		// FUNCTIONS
		geoCPColonias,
		setGeoCPColonias,
		IDEntidad,
		setIDEntidad,
		IDMunicipio,
		setIDMunicipio,
		Entidad,
		setEntidad,
		Municipio,
		setMunicipio,
		codpost,
		bringcod,
		activeButton,
		setActiveButton,
		activeButtonMenu,
		setActiveButtonMenu,
		ListView,
		setListView,
		handleButtonClick,

		/////////////////////////////
	};
	return <FormularioContext.Provider value={data}>{children}</FormularioContext.Provider>;
};

FormularioProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default FormularioProvider;

export { FormularioContext };
