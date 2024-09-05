export interface Recipe {
	label: string; //  заголовок рецепта
	uri: string; //  уникальный идентификатор рецепта
	image: string; //  ссылка на изображение рецепта
	calories?: number; // Калории
	cautions?: string[]; // Предупреждения
	cuisineType?: string[]; // Тип кухни (например, 'mexican')
	dietLabels?: string[]; // Диетические метки (например, 'Low-Carb')
	digest?: Digest[]; // Список нутриентов с подробной информацией
	dishType?: string[]; // Тип блюда (например, 'starter')
	healthLabels?: string[]; // Метки здоровья (например, 'Gluten-Free')
	ingredientLines?: string[]; // Список строк ингредиентов
	ingredients?: Ingredient[]; // Подробные данные об ингредиентах
	mealType?: string[]; // Тип приема пищи (например, 'lunch/dinner')
	shareAs?: string; // Ссылка на общий доступ к рецепту
	source?: string; // Источник рецепта
	totalDaily?: Record<string, Nutrient>; // Суточные нормы нутриентов
	totalNutrients?: Record<string, Nutrient>; // Общие нутриенты рецепта
	totalTime?: number; // Общее время приготовления в минутах
	totalWeight?: number; // Общий вес рецепта в граммах
	url?: string; // URL рецепта на источнике
	yield?: number; // Количество порций
}

export interface Digest {
	label: string;
	tag: string;
	schemaOrgTag: string | null;
	total: number;
	hasRDI: boolean;
	daily: number;
	unit: string;
	sub?: Digest[];
}

export interface Ingredient {
	text: string;
	weight: number;
	foodCategory?: string;
	foodId?: string;
	image?: string;

}

export interface Nutrient {
	label: string;
	quantity: number;
	unit: string;
}

export interface Product {
	name: string;
	type: string;
	calories: number;
	meal: string;
	image: File | null;
	description: string;
    id?: number;
    yield?:number;
    healthLabels?: string[];
    ingredientLines?: string[];
    totalTime?: number; 
}
export interface QueryParams {
    query: string;
    from: number;
    to: number;
}
