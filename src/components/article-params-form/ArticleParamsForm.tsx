import { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
// import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

type ArticleParamsFormProps = {
	setCurrentArticleState: (param: ArticleStateType) => void;
	currentArticleState: ArticleStateType;
};

export const ArticleParamsForm = ({
	setCurrentArticleState,
	currentArticleState,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setisFormOpen] = useState<boolean>(false);
	const formContainerRef = useRef<HTMLDivElement>(null);
	const [selectedArticleState, setselectedArticleState] =
		useState<ArticleStateType>(currentArticleState);

	const handleOptionChange = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setselectedArticleState({ ...selectedArticleState, [key]: value });
	};

	const handleResetForm = () => {
		const defaultState = defaultArticleState;
		setselectedArticleState(defaultState);
		setCurrentArticleState(defaultState);
	};

	// useOutsideClickClose({
	// 	isOpen: isFormOpen,
	// 	rootRef: formContainerRef,
	// 	onClose: () => setisFormOpen(false),
	// 	onChange: setisFormOpen,
	// });
	useEffect(() => {
		if (!isFormOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				formContainerRef.current &&
				!formContainerRef.current.contains(event.target as Node)
			) {
				setisFormOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isFormOpen]);

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={setisFormOpen} />
			<aside
				ref={formContainerRef}
				className={clsx(styles.container, isFormOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						setCurrentArticleState(selectedArticleState);
					}}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={selectedArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							handleOptionChange('fontFamilyOption', option)
						}
						title='Шрифт'
					/>
					<RadioGroup
						selected={selectedArticleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) => handleOptionChange('fontSizeOption', option)}
						title='Размер шрифта'
						name='fontSize'
					/>
					<Select
						selected={selectedArticleState.fontColor}
						options={fontColors}
						onChange={(option) => handleOptionChange('fontColor', option)}
						title='Цвет шрифта'
					/>
					<Select
						options={backgroundColors}
						selected={selectedArticleState.backgroundColor}
						onChange={(option) => handleOptionChange('backgroundColor', option)}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={selectedArticleState.contentWidth}
						onChange={(option) => handleOptionChange('contentWidth', option)}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleResetForm}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
