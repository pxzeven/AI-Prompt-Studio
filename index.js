/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from '@google/genai';

// --- DOM ELEMENT REFERENCES ---
const modeRadios = document.querySelectorAll('input[name="mode"]');
const fileUploaderContainer = document.getElementById('file-uploader-container');
const fileUploader = document.getElementById('file-uploader');
const imagePreviewContainer = document.getElementById('image-preview-container');
const imagePreview = document.getElementById('image-preview');
const promptForm = document.getElementById('prompt-form');
const submitButton = document.getElementById('submit-button');
const feelingLuckyButton = document.getElementById('feeling-lucky-button');
const formButtonsContainer = document.getElementById('form-buttons-container');
const surpriseMeButton = document.getElementById('surprise-me-button');
const resultContainer = document.getElementById('result-container');
const loadingIndicator = document.getElementById('loading-indicator');
const errorMessage = document.getElementById('error-message');
const promptResult = document.getElementById('prompt-result');
const candidAspectRatioContainer = document.getElementById('candid-aspect-ratio-container');
const candidAspectRatioSelector = document.getElementById('candid-aspect-ratio-selector');
const candidOrientationToggle = document.getElementById('candid-orientation-toggle');
const apiKeyNotice = document.getElementById('api-key-notice');
const languageToggle = document.getElementById('language-toggle');
const themeToggleButton = document.getElementById('theme-toggle-button');

// Mode-specific prompt inputs
const builderPromptContainer = document.getElementById('builder-prompt-container');
const builderPromptInput = document.getElementById('builder-prompt-input');
const builderPromptLabel = document.querySelector('label[for="builder-prompt-input"]');
const enhanceBuilderButton = document.getElementById('enhance-builder-button');
const candidActionContainer = document.getElementById('candid-action-container');
const candidActionInput = document.getElementById('candid-action-input');
const randomActionButton = document.getElementById('random-action-button');

// Candid Action controls
const candidEnvironmentContainer = document.getElementById('candid-environment-container');
const candidEnvironmentInput = document.getElementById('candid-environment-input');
const candidTimeOfDayContainer = document.getElementById('candid-time-of-day-container');
const candidTimeOfDaySelector = document.getElementById('candid-time-of-day-selector');
const randomEnvironmentButton = document.getElementById('random-environment-button');

// Ad Creator controls
const adCreatorOptions = document.getElementById('ad-creator-options');
const adCreatorSubModeSelector = document.getElementById('ad-creator-sub-mode-selector');
const adSubModeRadios = document.querySelectorAll('input[name="ad-sub-mode"]');
const adAdherenceContainer = document.getElementById('ad-adherence-container');
const adProductNameInput = document.getElementById('ad-product-name');
const adSloganInput = document.getElementById('ad-slogan');
const logoUploader = document.getElementById('logo-uploader');
const logoPreviewContainer = document.getElementById('logo-preview-container');
const logoPreview = document.getElementById('logo-preview');
const productLogoUploader = document.getElementById('product-logo-uploader');
const productLogoPreviewContainer = document.getElementById('product-logo-preview-container');
const productLogoPreview = document.getElementById('product-logo-preview');
const adAdherenceSlider = document.getElementById('ad-adherence-slider');
const adAdherenceLevelValue = document.getElementById('ad-adherence-level-value');
const adAdditionalFieldsList = document.getElementById('ad-additional-fields-list');
const addAdFieldButton = document.getElementById('add-ad-field-button');
const adFieldsSpinner = document.getElementById('ad-fields-spinner');
const addAdProductButton = document.getElementById('add-ad-product-button');
const adProductsList = document.getElementById('ad-products-list');
const analysisOverlay = document.getElementById('analysis-overlay');
const cancelAnalysisButton = document.getElementById('cancel-analysis-button');
const translateProductNameButton = document.getElementById('translate-product-name-button');
const translateSloganButton = document.getElementById('translate-slogan-button');

// Logo Creator controls
const logoCreatorOptions = document.getElementById('logo-creator-options');
const logoCompanyNameInput = document.getElementById('logo-company-name');
const logoIndustryInput = document.getElementById('logo-industry');
const logoSloganInput = document.getElementById('logo-slogan');
const logoReferenceUploader = document.getElementById('logo-reference-uploader');
const logoReferencePreviewContainer = document.getElementById('logo-reference-preview-container');
const logoReferencePreview = document.getElementById('logo-reference-preview');
const logoStyleSelector = document.getElementById('logo-style-selector');
const logoOutputVariationsSelector = document.getElementById('logo-output-variations-selector');
const logoCoreElementsInput = document.getElementById('logo-core-elements');
const logoMotifsInput = document.getElementById('logo-motifs');
const logoColorsInput = document.getElementById('logo-colors');
const logoColorPicker = document.getElementById('logo-color-picker');
const logoSpecialEffectsInput = document.getElementById('logo-special-effects');
const logoBackgroundStyleInput = document.getElementById('logo-background-style');
const logoBackgroundColorPicker = document.getElementById('logo-background-color-picker');
const logoFontStyleSelector = document.getElementById('logo-font-style-selector');


// Prompt Generation controls
const promptGenerationOptions = document.getElementById('prompt-generation-options');
const numPromptsSlider = document.getElementById('num-prompts-slider');
const numPromptsValue = document.getElementById('num-prompts-value');
const analyzeHumanDetailsCheckbox = document.getElementById('analyze-human-details-checkbox');
const analyzeHumanDetailsContainer = document.getElementById('analyze-human-details-container');
const generateAsCommandCheckbox = document.getElementById('generate-as-command-checkbox');
const sponsorNameInput = document.getElementById('sponsor-name-input');
const negativePromptInput = document.getElementById('negative-prompt-input');
const negativePromptContainer = document.getElementById('negative-prompt-container');
const optionTabs = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const whiteBannerContainer = document.getElementById('white-banner-container');
const whiteBannerCheckbox = document.getElementById('add-white-banner-checkbox');


// New Prompt Customization Controls
const artisticStyleSelector = document.getElementById('artistic-style-selector');
const aimForPhotorealismCheckbox = document.getElementById('aim-for-photorealism-checkbox');
const cameraAngleSelector = document.getElementById('camera-angle-selector');
const shotTypeSelector = document.getElementById('shot-type-selector');
const lensTypeSelector = document.getElementById('lens-type-selector');
const cameraLookSelector = document.getElementById('camera-look-selector');
const lightingSelector = document.getElementById('lighting-selector');
const colorPaletteSelector = document.getElementById('color-palette-selector');
const detailLevelSlider = document.getElementById('detail-level-slider');
const detailLevelValue = document.getElementById('detail-level-value');
const humanLookSelector = document.getElementById('human-look-selector');
const humanAgeSelector = document.getElementById('human-age-selector');
const hairStyleSelector = document.getElementById('hair-style-selector');
const fashionStyleSelector = document.getElementById('fashion-style-selector');
const traditionalDressSelector = document.getElementById('traditional-dress-selector');
const accessoriesSelector = document.getElementById('accessories-selector');

// Modal controls
const policyModal = document.getElementById('policy-modal');
const policyButton = document.getElementById('policy-button');
const closeModalButton = document.getElementById('close-modal-button');

// Full Prompt Modal controls
const fullPromptModal = document.getElementById('full-prompt-modal');
const fullPromptText = document.getElementById('full-prompt-text');
const copyFullPromptButton = document.getElementById('copy-full-prompt-button');

// Suggestions Modal controls
const suggestionsModal = document.getElementById('suggestions-modal');
const closeSuggestionsModalButton = document.getElementById('close-suggestions-modal-button');
const suggestionsListContainer = document.getElementById('suggestions-list-container');
const suggestionsList = document.getElementById('suggestions-list');
const suggestionsError = document.getElementById('suggestions-error');

// History Modal controls
const historyModal = document.getElementById('history-modal');
const historyButton = document.getElementById('history-button');
const closeHistoryModalButton = document.getElementById('close-history-modal-button');
const historyList = document.getElementById('history-list');
const noHistoryMessage = document.getElementById('no-history-message');
const clearHistoryButton = document.getElementById('clear-history-button');
const historySearchInput = document.getElementById('history-search-input');
const historyModeFilter = document.getElementById('history-mode-filter');
const historyDateFilter = document.getElementById('history-date-filter');

// Settings Modal controls
const settingsModal = document.getElementById('settings-modal');
const settingsButton = document.getElementById('settings-button');
const closeSettingsModalButton = document.getElementById('close-settings-modal-button');
const uiModeRadios = document.querySelectorAll('input[name="ui-mode"]');
const apiKeyInput = document.getElementById('api-key-input');
const saveApiKeyButton = document.getElementById('save-api-key-button');
const apiKeyList = document.getElementById('api-key-list');
const noKeysMessage = document.getElementById('no-keys-message');
const modelSelectorDropdown = document.getElementById('model-selector-dropdown');

// Donation Modal controls
const donationButton = document.getElementById('donation-button');
const donationModal = document.getElementById('donation-modal');
const copyDonationPhoneButton = document.getElementById('copy-donation-phone-button');
const donationPhoneNumber = document.getElementById('donation-phone-number');


// --- APP STATE ---
let currentMode = 'builder'; // 'prompt', 'builder', 'candid', 'ad-creator', or 'logo-creator'
let adCreatorSubMode = 'reference'; // 'reference' or 'idea'
let uploadedFile = null;
let uploadedLogoFile = null;
let uploadedProductLogoFile = null;
let uploadedReferenceLogoFile = null;
let translations = {};
let analysisAbortController = null;
let apiKeyStatuses = {}; // e.g., { "AIza...": "valid" }


// --- CONSTANTS ---
const ratioTranslationMap = {
    '1:1': { key: 'aspectRatioSquare', text: 'Square (1:1)' },
    '9:16': { key: 'aspectRatio9_16', text: 'Portrait (9:16)' },
    '4:5': { key: 'aspectRatio4_5', text: 'Portrait (4:5)' },
    '5:7': { key: 'aspectRatio5_7', text: 'Portrait (5:7)' },
    '3:4': { key: 'aspectRatio3_4', text: 'Portrait (3:4)' },
    '3:5': { key: 'aspectRatio3_5', text: 'Portrait (3:5)' },
    '2:3': { key: 'aspectRatio2_3', text: 'Portrait (2:3)' },
    '16:9': { key: 'aspectRatioWallpaper', text: 'Landscape (16:9)' },
    '5:4': { key: 'aspectRatio5_4', text: 'Landscape (5:4)' },
    '7:5': { key: 'aspectRatio7_5', text: 'Landscape (7:5)' },
    '4:3': { key: 'aspectRatio4_3', text: 'Landscape (4:3)' },
    '5:3': { key: 'aspectRatio5_3', text: 'Landscape (5:3)' },
    '3:2': { key: 'aspectRatio3_2', text: 'Landscape (3:2)' },
};

const portraitRatios = ['1:1', '9:16', '4:5', '5:7', '3:4', '3:5', '2:3'];
const landscapeRatios = ['1:1', '16:9', '5:4', '7:5', '4:3', '5:3', '3:2'];


// --- API KEY & MODEL MANAGEMENT ---

const getSavedApiKeys = () => JSON.parse(localStorage.getItem('apiKeys') || '[]');
const saveApiKeys = (keys) => localStorage.setItem('apiKeys', JSON.stringify(keys));
const getActiveApiKey = () => localStorage.getItem('activeApiKey');
const setActiveApiKey = (key) => localStorage.setItem('activeApiKey', key);
const getActiveModel = () => localStorage.getItem('activeModel') || 'gemini-2.5-flash';
const saveActiveModel = (model) => localStorage.setItem('activeModel', model);

// --- UI MODE MANAGEMENT ---
const getUiMode = () => localStorage.getItem('uiMode') || 'basic';
const saveUiMode = (mode) => localStorage.setItem('uiMode', mode);

/**
 * Returns an initialized GoogleGenAI client if an API key is available.
 * @returns {GoogleGenAI}
 * @throws {Error} if no API key is set.
 */
const getGenAIClient = () => {
    const activeKey = getActiveApiKey();
    if (!activeKey) {
        throw new Error('API Key not set. Please add one in Settings.');
    }
    return new GoogleGenAI({ apiKey: activeKey });
};

// --- PROMPT HISTORY ---
const getPromptHistory = () => {
    let history = JSON.parse(localStorage.getItem('promptHistory') || '[]');
    // One-time migration for old history format (string array) to new format (object array)
    if (history.length > 0 && typeof history[0] === 'string') {
        history = history.map((prompt, index) => ({
            prompt,
            mode: 'builder', // Assume old prompts were from builder mode as it was the default
            timestamp: Date.now() - (index * 60000) // Stagger timestamps to maintain some order
        })).reverse(); // Old format had newest first, so reverse to have oldest first before saving
        localStorage.setItem('promptHistory', JSON.stringify(history));
    }
    return history;
};

const saveToHistory = (prompt, mode) => {
    if (!prompt || !prompt.trim()) return;
    let history = getPromptHistory();
    const newEntry = {
        prompt,
        mode,
        timestamp: Date.now()
    };
    // Remove exact duplicate prompt to move it to the top
    history = history.filter(item => item.prompt !== prompt);
    history.unshift(newEntry);
    // Limit history size
    if (history.length > 20) {
        history = history.slice(0, 20);
    }
    localStorage.setItem('promptHistory', JSON.stringify(history));
};


// --- LANGUAGE & TRANSLATION ---
const getSavedLanguage = () => localStorage.getItem('language') || 'en';
const saveLanguage = (lang) => localStorage.setItem('language', lang);

/**
 * Loads translations from the locales file for the given language.
 * @param {string} lang - The language code (e.g., 'en', 'my').
 */
const loadTranslations = async (lang) => {
    try {
        const response = await fetch(`./locales/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load translations for ${lang}`);
        }
        translations = await response.json();
    } catch (error) {
        console.error(error);
        // Fallback to English if the selected language fails to load
        if (lang !== 'en') {
            await loadTranslations('en');
        }
    }
};

/**
 * Populates the candid aspect ratio dropdown with either portrait or landscape ratios.
 * @param {boolean} isLandscape - True to populate with landscape ratios, false for portrait.
 */
const populateCandidAspectRatioDropdown = (isLandscape) => {
    const ratios = isLandscape ? landscapeRatios : portraitRatios;
    const defaultSelection = isLandscape ? '16:9' : '5:7';
    candidAspectRatioSelector.innerHTML = ''; // Clear existing options

    ratios.forEach(ratio => {
        const option = document.createElement('option');
        const ratioInfo = ratioTranslationMap[ratio];

        option.value = ratio;
        // Use translation if available, otherwise use the default text
        option.textContent = (translations && translations[ratioInfo.key]) ? translations[ratioInfo.key] : ratioInfo.text;
        option.selected = (ratio === defaultSelection);
        candidAspectRatioSelector.appendChild(option);
    });
};


/**
 * Applies the loaded translations to all relevant DOM elements.
 */
const applyTranslations = () => {
    if (!Object.keys(translations).length) return;

    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[key]) {
            el.textContent = translations[key];
        }
    });

     document.querySelectorAll('[data-translate-title]').forEach(el => {
        const key = el.getAttribute('data-translate-title');
        if (translations[key]) {
            el.title = translations[key];
        }
    });
    
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        if (translations[key] && !el.disabled) { // Don't overwrite placeholder if it's being used for a status
            el.placeholder = translations[key];
        }
    });

    document.querySelectorAll('[data-translate-alt]').forEach(el => {
        const key = el.getAttribute('data-translate-alt');
        if (translations[key]) {
            el.alt = translations[key];
        }
    });

    // Repopulate dynamic elements that need translations
    populateCandidAspectRatioDropdown(candidOrientationToggle.checked);

    // Update dynamic elements and placeholders
    updateUIMode();
};

/**
 * Sets the application language, loads translations, and updates the UI.
 * @param {string} lang - The language code to set.
 */
const setLanguage = async (lang) => {
    saveLanguage(lang);
    await loadTranslations(lang);
    applyTranslations();
    document.documentElement.lang = lang;
    languageToggle.checked = (lang === 'my');
};


// --- HELPER FUNCTIONS ---

/**
 * Converts a File object to a base64 encoded string.
 * @param {File} file The file to convert.
 * @returns {Promise<{base64: string, mimeType: string}>}
 */
const fileToGenerativePart = async (file) => {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    base64: await base64EncodedDataPromise,
    mimeType: file.type,
  };
};


/**
 * Updates the UI based on the selected Ad Creator sub-mode.
 */
const updateAdCreatorSubModeUI = () => {
    const selectedSubMode = document.querySelector('input[name="ad-sub-mode"]:checked').value;
    adCreatorSubMode = selectedSubMode;

    const isReferenceMode = adCreatorSubMode === 'reference';

    // The main file uploader is for the reference ad.
    fileUploaderContainer.classList.toggle('hidden', !isReferenceMode);
    adAdherenceContainer.classList.toggle('hidden', !isReferenceMode);

    // Hide image preview if switching away from reference mode
    if (!isReferenceMode) {
        imagePreviewContainer.classList.add('hidden');
    } else {
        // Show preview only if there is a file already uploaded
        if (uploadedFile) {
            imagePreviewContainer.classList.remove('hidden');
        }
    }

    if (isReferenceMode) {
        fileUploader.previousElementSibling.textContent = translations.adReferenceImageLabel || "Upload Reference Ad";
    }
};


/**
 * Updates the UI based on the selected mode.
 */
const updateUIMode = () => {
  clearResults();
  const uiMode = getUiMode();

  // Hide all optional controls by default
  fileUploaderContainer.classList.add('hidden');
  imagePreviewContainer.classList.add('hidden');
  candidAspectRatioContainer.classList.add('hidden');
  candidEnvironmentContainer.classList.add('hidden');
  candidTimeOfDayContainer.classList.add('hidden');
  promptGenerationOptions.classList.add('hidden');
  negativePromptContainer.classList.add('hidden');
  whiteBannerContainer.classList.add('hidden');
  feelingLuckyButton.classList.add('hidden');
  surpriseMeButton.classList.add('hidden');
  adCreatorOptions.classList.add('hidden');
  logoCreatorOptions.classList.add('hidden');
  logoReferencePreviewContainer.classList.add('hidden');
  formButtonsContainer.classList.remove('horizontal');
  analyzeHumanDetailsContainer.classList.add('hidden');
  adAdditionalFieldsList.innerHTML = '';
  adProductsList.innerHTML = '';
  
  // Hide all prompt inputs
  builderPromptContainer.classList.add('hidden');
  candidActionContainer.classList.add('hidden');

  // Reset defaults
  artisticStyleSelector.value = 'default';
  aimForPhotorealismCheckbox.checked = false;
  generateAsCommandCheckbox.checked = false;
  
  // Reset builder prompt label and placeholder
  builderPromptLabel.textContent = translations.promptLabel || 'Base Idea or Action';
  builderPromptInput.placeholder = translations.promptPlaceholderBuilder || 'e.g., A wizard in a futuristic city';

  if (currentMode === 'prompt') {
    fileUploaderContainer.classList.remove('hidden');
    promptGenerationOptions.classList.remove('hidden');
    negativePromptContainer.classList.remove('hidden');
    whiteBannerContainer.classList.remove('hidden');
    analyzeHumanDetailsContainer.classList.remove('hidden');
    submitButton.textContent = translations.submitButtonGeneratePrompt || 'Generate Prompt';
    feelingLuckyButton.classList.remove('hidden');
    generateAsCommandCheckbox.checked = true;

    // The main prompt input is not used in this mode, so hide it.
    builderPromptContainer.classList.add('hidden');

    if (uiMode === 'basic') {
        // In basic mode for "From Image", we only show the 'advanced' tab content, but simplified.
        // CSS handles hiding the tabs and the extra options within the advanced tab.
        // We need to force the advanced tab to be the 'active' one.
        optionTabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        document.getElementById('tab-content-advanced').classList.add('active');
    } else {
        // In advanced mode, ensure the tabs are behaving normally.
        const activeTab = document.querySelector('.tab-button.active');
        const activeContent = document.querySelector('.tab-content.active');
        if (!activeTab || !activeContent) {
            document.querySelector('.tab-button[data-tab="style"]').classList.add('active');
            document.getElementById('tab-content-style').classList.add('active');
        }
    }


  } else if (currentMode === 'builder') {
    builderPromptContainer.classList.remove('hidden');
    // promptGenerationOptions is shown/hidden by CSS based on uiMode
    promptGenerationOptions.classList.remove('hidden'); 
    negativePromptContainer.classList.remove('hidden');
    whiteBannerContainer.classList.remove('hidden');
    submitButton.textContent = translations.submitButtonBuildPrompt || 'Build Prompt';
    
    artisticStyleSelector.value = 'photorealistic';
    aimForPhotorealismCheckbox.checked = true;

  } else if (currentMode === 'candid') {
    candidActionContainer.classList.remove('hidden');
    candidEnvironmentContainer.classList.remove('hidden');
    negativePromptContainer.classList.remove('hidden');
    whiteBannerContainer.classList.remove('hidden');
    // These are shown/hidden by CSS based on uiMode
    candidAspectRatioContainer.classList.remove('hidden');
    candidTimeOfDayContainer.classList.remove('hidden');

    submitButton.textContent = translations.submitButtonGenerateCandid || 'Generate Candid Prompt';
    
    surpriseMeButton.classList.remove('hidden');
    formButtonsContainer.classList.add('horizontal');
  } else if (currentMode === 'ad-creator') {
    builderPromptContainer.classList.remove('hidden');
    adCreatorOptions.classList.remove('hidden');
    negativePromptContainer.classList.remove('hidden');
    whiteBannerContainer.classList.remove('hidden');
    
    builderPromptLabel.textContent = translations.adProductDescriptionLabel || 'Product Description';
    builderPromptInput.placeholder = translations.adProductDescriptionPlaceholder || 'e.g., A refreshing lager in a glass bottle';
    submitButton.textContent = translations.submitButtonGenerateAd || 'Generate Ad Prompt';
    
    // This will handle showing/hiding the reference uploader based on sub-mode
    updateAdCreatorSubModeUI(); 
  } else if (currentMode === 'logo-creator') {
    logoCreatorOptions.classList.remove('hidden');
    negativePromptContainer.classList.remove('hidden');
    whiteBannerContainer.classList.remove('hidden');
    submitButton.textContent = translations.submitButtonGenerateLogo || 'Generate Logo Prompt';
  }
};


/**
 * Clears any previous results or errors from the UI.
 */
const clearResults = () => {
  promptResult.innerHTML = '';
  errorMessage.classList.add('hidden');
  errorMessage.textContent = '';
};

/**
 * Displays a loading indicator and disables the form.
 */
const showLoading = () => {
  loadingIndicator.classList.remove('hidden');
  submitButton.disabled = true;
  feelingLuckyButton.disabled = true;
};

/**
 * Hides the loading indicator and enables the form.
 */
const hideLoading = () => {
  loadingIndicator.classList.add('hidden');
  if (getActiveApiKey()) {
      submitButton.disabled = false;
      feelingLuckyButton.disabled = false;
  }
};

/**
 * Displays an error message in the UI.
 * @param {string} message The error message to display.
 */
const displayError = (message) => {
  clearResults();
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
};

/**
 * Processes an API error and returns a user-friendly, translated message.
 * @param {Error} error The error object from a catch block.
 * @returns {string} A user-friendly error message.
 */
const processApiError = (error) => {
    const errorMessage = error.message || String(error);
    console.error('Original API Error:', error); // Log the full error for debugging

    if (errorMessage.includes("User location is not supported")) {
        return translations.vpnRequiredError || "Please connect to a VPN to use the service.";
    }
    if (errorMessage.includes("API key not valid")) {
        return translations.invalidApiKeyError || "The API key is not valid. Please check it in the settings.";
    }
    
    // Default error message for other cases
    return `${translations.errorPrefix || 'An error occurred'}: ${errorMessage}`;
};


/**
 * Renders generated prompts and design analyses in the result area.
 * @param {Array<{prompt: string, designAnalysis: string | null}>} suggestions The array of suggestions to render.
 */
const renderPromptAndAnalysis = (suggestions) => {
    clearResults();

    if (!suggestions || suggestions.length === 0) {
        promptResult.textContent = translations.modelDidNotReturnSuggestions;
        return;
    }

    suggestions.forEach((suggestion, index) => {
        const { prompt: promptText, designAnalysis: analysisText } = suggestion;

        const card = document.createElement('div');
        card.className = 'result-card';

        if (suggestions.length > 1) {
            const header = document.createElement('h3');
            header.textContent = `${translations.suggestionHeader || 'Suggestion #'}${index + 1}`;
            card.appendChild(header);
        }

        const promptPreview = document.createElement('p');
        promptPreview.className = 'prompt-preview';
        promptPreview.textContent = `${promptText.substring(0, 150)}...`;
        card.appendChild(promptPreview);

        const actions = document.createElement('div');
        actions.className = 'result-actions';

        const expandButton = document.createElement('button');
        expandButton.type = 'button';
        expandButton.className = 'icon-button';
        expandButton.innerHTML = `<i class="bi bi-arrows-fullscreen"></i> <span data-translate="expandButton">Expand</span>`;
        expandButton.onclick = () => {
            fullPromptText.textContent = promptText;
            fullPromptModal.classList.remove('hidden');
            document.body.classList.add('modal-open');
        };

        const copyButton = document.createElement('button');
        copyButton.type = 'button';
        copyButton.className = 'icon-button';
        const copyButtonText = translations.copyButtonText || 'Copy';
        copyButton.innerHTML = `<i class="bi bi-clipboard"></i> <span>${copyButtonText}</span>`;
        copyButton.onclick = () => {
            navigator.clipboard.writeText(promptText);
            copyButton.querySelector('span').textContent = translations.copiedButton || 'Copied!';
            setTimeout(() => {
                copyButton.querySelector('span').textContent = copyButtonText;
            }, 2000);
        };

        actions.appendChild(expandButton);
        actions.appendChild(copyButton);
        card.appendChild(actions);

        if (analysisText) {
            const analysisContainer = document.createElement('div');
            analysisContainer.className = 'analysis-section';

            const analysisHeader = document.createElement('h4');
            analysisHeader.textContent = translations.designAnalysisHeader || 'Design & Template Analysis';

            const analysisPre = document.createElement('pre');
            analysisPre.textContent = analysisText;

            analysisContainer.appendChild(analysisHeader);
            analysisContainer.appendChild(analysisPre);
            card.appendChild(analysisContainer);
        }

        promptResult.appendChild(card);
    });
};

// --- EVENT HANDLERS ---

/**
 * Translates text from Myanmar to English using the Gemini API.
 * @param {string} text The text to translate.
 * @returns {Promise<string>} The translated English text.
 */
const translateMyanmarToEnglish = async (text) => {
    try {
        const ai = getGenAIClient();
        const response = await ai.models.generateContent({
            model: getActiveModel(),
            contents: `Translate the following Burmese (Myanmar) text to English. Provide only the translated English text, with no extra explanation, labels, or quotation marks. Text to translate: "${text}"`,
        });
        return response.text.trim();
    } catch (error) {
        // Rethrow the original error to be handled by the UI function
        throw error;
    }
};

/**
 * Handles the click event for a translate button.
 * @param {HTMLInputElement|HTMLTextAreaElement} inputElement The input element to get text from and update.
 * @param {HTMLButtonElement} buttonElement The button that was clicked.
 */
const handleTranslateClick = async (inputElement, buttonElement) => {
    const textToTranslate = inputElement.value.trim();
    if (!textToTranslate) return;

    buttonElement.disabled = true; // This will trigger the spinner via CSS

    try {
        const translatedText = await translateMyanmarToEnglish(textToTranslate);
        inputElement.value = translatedText;
    } catch (error) {
        alert(processApiError(error));
    } finally {
        buttonElement.disabled = false;
    }
};


/**
 * Handles clicks on the enhance prompt button.
 * @param {HTMLTextAreaElement} inputElement The textarea to get the prompt from.
 * @param {HTMLButtonElement} buttonElement The button that was clicked.
 */
const handleEnhancePrompt = async (inputElement, buttonElement) => {
    const currentPrompt = inputElement.value.trim();
    if (!currentPrompt) {
        alert(translations.enhancePromptAlert);
        return;
    }

    suggestionsList.innerHTML = '';
    suggestionsError.classList.add('hidden');
    suggestionsListContainer.innerHTML = '<div class="spinner"></div>';
    suggestionsModal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    buttonElement.disabled = true;

    try {
        const ai = getGenAIClient();
        const response = await ai.models.generateContent({
            model: getActiveModel(),
            contents: `Based on the user's simple prompt "${currentPrompt}", generate 3 diverse, detailed, and artistic prompts for an image generation model. The prompts should be creative and descriptive.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        prompts: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        }
                    },
                    required: ["prompts"]
                },
            },
        });
        
        const jsonResponse = JSON.parse(response.text);
        const suggestions = jsonResponse.prompts;

        suggestionsListContainer.innerHTML = '';
        suggestionsListContainer.appendChild(suggestionsList); 

        if (!suggestions || suggestions.length === 0) {
            throw new Error(translations.modelDidNotReturnSuggestions);
        }
        
        const closeSuggestionsModal = () => {
            suggestionsModal.classList.add('hidden');
            if (!document.querySelector('.modal-overlay:not(.hidden)')) {
                document.body.classList.remove('modal-open');
            }
        };

        suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            li.onclick = () => {
                inputElement.value = suggestion;
                closeSuggestionsModal();
            };
            suggestionsList.appendChild(li);
        });

    } catch (error) {
        suggestionsListContainer.innerHTML = '';
        suggestionsError.textContent = processApiError(error);
        suggestionsError.classList.remove('hidden');
    } finally {
        buttonElement.disabled = false;
    }
};


/**
 * Handles the generation of a prompt from a base idea and selected options.
 */
const handleBuildPrompt = async () => {
    try {
        showLoading();
        clearResults();

        const ai = getGenAIClient();
        const activeModel = getActiveModel();
        const baseIdea = builderPromptInput.value.trim();
        const numVariations = numPromptsSlider.value;
        const isPhotorealistic = aimForPhotorealismCheckbox.checked;
        const sponsorName = sponsorNameInput.value.trim();
        const negativePrompt = negativePromptInput.value.trim();

        let customizationInstructions = [];
        const getSelectedText = (el) => el.options[el.selectedIndex].text;

        if (artisticStyleSelector.value !== 'default') customizationInstructions.push(`- Artistic Style: ${getSelectedText(artisticStyleSelector)}`);
        if (cameraAngleSelector.value !== 'default') customizationInstructions.push(`- Camera Angle: ${getSelectedText(cameraAngleSelector)}`);
        if (shotTypeSelector.value !== 'default') customizationInstructions.push(`- Shot Type: ${getSelectedText(shotTypeSelector)}`);
        if (lensTypeSelector.value !== 'default') customizationInstructions.push(`- Lens Type: ${getSelectedText(lensTypeSelector)}`);
        if (cameraLookSelector.value !== 'default') customizationInstructions.push(`- Camera Look: ${getSelectedText(cameraLookSelector)}`);
        if (lightingSelector.value !== 'default') customizationInstructions.push(`- Lighting: ${getSelectedText(lightingSelector)}`);
        if (colorPaletteSelector.value !== 'default') customizationInstructions.push(`- Color Palette: ${getSelectedText(colorPaletteSelector)}`);
        if (humanLookSelector.value !== 'default') customizationInstructions.push(`- Human Look & Expression: ${getSelectedText(humanLookSelector)}`);
        if (humanAgeSelector.value !== 'default') customizationInstructions.push(`- Human Age: ${getSelectedText(humanAgeSelector)}`);
        if (hairStyleSelector.value !== 'default') customizationInstructions.push(`- Hair Style: ${getSelectedText(hairStyleSelector)}`);
        if (fashionStyleSelector.value !== 'default') customizationInstructions.push(`- Fashion Style: ${getSelectedText(fashionStyleSelector)}`);
        if (traditionalDressSelector.value !== 'default') customizationInstructions.push(`- Traditional Dress: ${getSelectedText(traditionalDressSelector)}`);
        if (accessoriesSelector.value !== 'default') customizationInstructions.push(`- Accessories: ${getSelectedText(accessoriesSelector)}`);

        const detailLevelMap = { '1': 'concise and simple', '2': 'detailed and descriptive', '3': 'highly detailed with evocative and elaborate language' };
        const detailLevelText = `The prompt's level of detail should be ${detailLevelMap[detailLevelSlider.value]}.`;

        let systemPrompt = `You are an expert prompt engineer and a descriptive writer, like an art director setting up a professional scene. Your task is to generate a comprehensive, well-written paragraph that describes an image for an AI generator. This paragraph must be rich in detail, composition, and atmosphere, suitable for creating a high-quality image.

Generate ${numVariations} distinct paragraph-style prompt variation(s).

**Output Style Guide:**
- Write in a single, coherent paragraph. Do not use lists or bullet points.
- Naturally integrate all the user's specifications.
- Describe the subject, their actions, expression, clothing, and accessories.
- Detail the environment, background, and setting.
- Explain the lighting, camera work (angle, shot type, lens), and composition.
- Evoke a specific mood or atmosphere.
- **Example of desired output format:** "A young Asian woman, likely in her late twenties, is positioned slightly off-center to the left, facing the viewer with a warm smile. Her skin tone is light. She has long, dark hair that transitions to a reddish-brown hue near the ends. She's wearing a sleeveless white dress. Her arms are crossed in front of her, with a delicate silver bracelet and a red string bracelet. The background features a vibrant green mesh with multiple potted orchids... The composition uses a medium shot, emphasizing the subject and her surroundings, creating a lively atmosphere."

**User's Core Idea:**
${baseIdea ? `"${baseIdea}"` : "The user has not provided a core idea. Please generate a random, creative, and inspiring scene based on the stylistic choices below."}

**User's Stylistic Choices (You MUST incorporate these):**
${customizationInstructions.length > 0 ? customizationInstructions.join('\n') : "None specified. Use your creative judgment."}

**Additional Instructions:**
- ${detailLevelText}
${isPhotorealistic ? `- The final prompt must describe a photorealistic image. Focus on realistic textures, lighting, and camera settings (e.g., "f/1.8, 1/250s, ISO 100", "shot on a Sony a7 IV with an 85mm lens"). AVOID words like "photorealistic" or "hyperrealistic" in the final prompt itself.` : ''}
${sponsorName ? `- CRITICAL: Naturally incorporate the brand name "${sponsorName}" into the scene.` : ''}
${negativePrompt ? `- The scene MUST NOT include: ${negativePrompt}.` : ''}
`;

        if (whiteBannerCheckbox.checked) {
             systemPrompt += `\n- CRITICAL COMPOSITION: Ensure the final generated prompt integrates the tag "(106%)" immediately after the main subject of the sentence. For example, instead of '(106%) a wizard...', it should be 'an advertisement image for a wizard(106%)...'. This tag instructs the image model to generate a taller canvas. The prompt must also describe a composition where all important elements are in the top portion of the canvas, leaving a solid white, empty banner at the very bottom.`;
        }


        const genContentResponse = await ai.models.generateContent({
            model: activeModel,
            contents: systemPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        prompts: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                                description: 'A detailed and creative prompt suitable for an image generation model.',
                            }
                        }
                    },
                    required: ["prompts"],
                },
            },
        });

        const jsonResponse = JSON.parse(genContentResponse.text);
        let finalPrompts = jsonResponse.prompts;
        if (whiteBannerCheckbox.checked) {
            finalPrompts = finalPrompts.map(p => (p || '').trim() + ' Add 6% white empty border to image.');
        }
        const suggestions = finalPrompts.map(p => ({ prompt: p, designAnalysis: null }));
        
        suggestions.forEach(s => saveToHistory(s.prompt, 'builder'));
        renderPromptAndAnalysis(suggestions);

    } catch (error) {
        displayError(processApiError(error));
    } finally {
        hideLoading();
    }
};

/**
 * Handles the generation of a prompt from an image, with different modes.
 * @param {boolean} isFeelingLucky - If true, generates a creative, transformative prompt.
 */
const handleGeneratePrompt = async (isFeelingLucky = false) => {
    try {
        if (!uploadedFile) throw new Error(translations.uploadImageError);

        showLoading();
        clearResults();

        const ai = getGenAIClient();
        const activeModel = getActiveModel();
        const imagePart = await fileToGenerativePart(uploadedFile);
        const numVariations = numPromptsSlider.value;
        const sponsorName = sponsorNameInput.value.trim();
        const isPhotorealistic = aimForPhotorealismCheckbox.checked;
        const shouldGenerateAsCommand = generateAsCommandCheckbox.checked;
        const negativePrompt = negativePromptInput.value.trim();

        let systemPrompt;
        
        const photoRealismInstructions = `
The prompt MUST focus on technical camera details to achieve a photorealistic result based on the image. It MUST include:
1.  **Camera & Lens:** Specify a realistic camera and lens combination (e.g., "shot on a Sony a7 IV with an 85mm f/1.4 prime lens").
2.  **Camera Settings:** Include specific settings like aperture, shutter speed, and ISO (e.g., "f/1.8, 1/250s, ISO 100").
3.  **Lighting:** Describe the lighting in photographic terms (e.g., "soft natural window light," "dramatic Rembrandt lighting," "golden hour backlighting").
4.  **Realism:** Emphasize natural details like skin texture, subtle imperfections, and realistic environments.

The prompt MUST AVOID:
-   The words "photorealistic," "hyperrealistic," "realistic," "Unreal Engine," "Octane Render," "CGI," or "AI-generated." Instead, describe the *qualities* of a real photo.
-   Overly perfect or plastic-looking descriptions.
The "Design & Template Analysis" should also reflect these photorealistic qualities.`;

        if (isFeelingLucky) {
            systemPrompt = `You are a highly imaginative art director specializing in photorealism. Analyze the provided image, but instead of describing it, invent a completely new, surprising, and creative concept to radically transform it into a photorealistic scene. Your goal is to generate an unexpected and inspiring prompt that results in a completely natural and lifelike image. Avoid cartoonish, animated, or overly fantastical styles.
The 'prompt' MUST be a command for an image editor, like "Transform the image into a hyper-realistic, dramatic black and white photo, focusing on sharp details and deep shadows."
Also, provide a "Design & Template Analysis" with comma-separated keywords for the *new* proposed photorealistic style.
Generate ${numVariations} distinct variation(s).`;
            
            if (shouldGenerateAsCommand) {
                systemPrompt += `\n\nCRITICAL INSTRUCTION: If the original image contains a person, your transformative command MUST preserve the person's facial identity and features. The radical transformation should apply ONLY to the style, clothing, background, and overall context, while keeping the face unchanged. This is the highest priority. For example: "Recreate the person, keeping their face identical, but dress them in futuristic space armor and place them on a Mars colony."`;
            }

            if (isPhotorealistic) {
                 systemPrompt += photoRealismInstructions;
            }

        } else {
             let customizationInstructions = [];
            const getSelectedText = (el) => el.options[el.selectedIndex].text;
            
            if (!isPhotorealistic && artisticStyleSelector.value !== 'default') customizationInstructions.push(`- Artistic Style: ${getSelectedText(artisticStyleSelector)}`);
            if (cameraAngleSelector.value !== 'default') customizationInstructions.push(`- Camera Angle: ${getSelectedText(cameraAngleSelector)}`);
            if (shotTypeSelector.value !== 'default') customizationInstructions.push(`- Shot Type: ${getSelectedText(shotTypeSelector)}`);
            if (lensTypeSelector.value !== 'default') customizationInstructions.push(`- Lens Type: ${getSelectedText(lensTypeSelector)}`);
            if (cameraLookSelector.value !== 'default') customizationInstructions.push(`- Camera Look: ${getSelectedText(cameraLookSelector)}`);
            if (lightingSelector.value !== 'default') customizationInstructions.push(`- Lighting: ${getSelectedText(lightingSelector)}`);
            if (colorPaletteSelector.value !== 'default') customizationInstructions.push(`- Color Palette: ${getSelectedText(colorPaletteSelector)}`);
            if (humanLookSelector.value !== 'default') customizationInstructions.push(`- Human Look & Expression: ${getSelectedText(humanLookSelector)}`);
            if (humanAgeSelector.value !== 'default') customizationInstructions.push(`- Human Age: ${getSelectedText(humanAgeSelector)}`);
            if (hairStyleSelector.value !== 'default') customizationInstructions.push(`- Hair Style: ${getSelectedText(hairStyleSelector)}`);
            if (fashionStyleSelector.value !== 'default') customizationInstructions.push(`- Fashion Style: ${getSelectedText(fashionStyleSelector)}`);
            if (traditionalDressSelector.value !== 'default') customizationInstructions.push(`- Traditional Dress: ${getSelectedText(traditionalDressSelector)}`);
            if (accessoriesSelector.value !== 'default') customizationInstructions.push(`- Accessories: ${getSelectedText(accessoriesSelector)}`);

            const detailLevelMap = { '1': 'concise and simple', '2': 'detailed and descriptive', '3': 'highly detailed with evocative and elaborate language' };
            customizationInstructions.push(`- Level of Detail: The prompt should be ${detailLevelMap[detailLevelSlider.value]}.`);

            systemPrompt = `You are an expert in image analysis with the descriptive skill of a novelist. Your goal is to analyze the provided image and generate two things:
1.  A "prompt": A single, detailed, and evocative paragraph that could be used to recreate a similar image. This paragraph should be a masterpiece of description.
2.  A "designAnalysis": A concise, comma-separated list of technical and stylistic keywords.

Generate ${numVariations} distinct variation(s).

**Paragraph Prompt Style Guide (for the "prompt" field):**
- Write in a single, coherent paragraph. Do not use lists or bullet points.
- Cover the subject (appearance, clothing, expression), the background, the specific lighting, the composition (e.g., 'medium shot', 'off-center'), and the overall atmosphere.
- **Example of desired output format:** "A young Asian woman, likely in her late twenties, is positioned slightly off-center to the left, facing the viewer with a warm smile. Her skin tone is light. She has long, dark hair that transitions to a reddish-brown hue near the ends. She's wearing a sleeveless white dress. Her arms are crossed in front of her, with a delicate silver bracelet and a red string bracelet. The background features a vibrant green mesh with multiple potted orchids... The composition uses a medium shot, emphasizing the subject and her surroundings, creating a lively atmosphere."

**User Constraints & Overrides:**
- You MUST adhere strictly to any constraints the user has specified below. If a user's constraint (e.g., 'Cyberpunk style') conflicts with the original image, prioritize the user's constraint, creatively blending it with the subject from the image.
${customizationInstructions.length > 0 ? customizationInstructions.join('\n') : "- No specific constraints provided."}

**Special Instructions:**
${analyzeHumanDetailsCheckbox.checked ? `- IMPORTANT: You MUST include a detailed analysis of the person's apparent gender, age range, fashion style, pose, and any cultural attire. Integrate these into the paragraph prompt.` : ''}
${isPhotorealistic ? photoRealismInstructions : ''}
${shouldGenerateAsCommand ? `
- CRITICAL: Phrase the "prompt" field as an imperative command for an AI image editor to apply the style to another image, while preserving the new subject's facial identity. Example: "Recreate the subject, keeping their original face, but place them in the same [pose/fashion] as the example, against a similar [background description] background."` : ''}
`;
        }
        
        let fullPrompt = systemPrompt;
        
        if (sponsorName) {
            fullPrompt += `\n\nCRITICAL: You must naturally and subtly incorporate the brand name "${sponsorName}" into the generated prompt. This could be on a product, a sign in the background, or as part of the overall theme. Also include the brand name in the design analysis keywords.`;
        }
        
        if (negativePrompt) {
            fullPrompt += `\n\nAVOID THE FOLLOWING: The prompt must not include any of the following concepts, themes, or objects: ${negativePrompt}. The design analysis should also reflect these exclusions.`;
        }

        if (whiteBannerCheckbox.checked) {
            fullPrompt += `\n\nCRITICAL COMPOSITION: When generating the 'prompt' field, you MUST integrate the tag "(106%)" immediately after the main subject of the sentence in the prompt. For example, instead of '(106%) A young woman...', it should be 'A young woman(106%)...'. This tag is crucial for generating a taller canvas. The prompt must also describe a composition with all important elements in the top part of the image, leaving a solid white, empty banner at the very bottom.`;
        }
        
        const finalContents = { parts: [ { inlineData: { data: imagePart.base64, mimeType: imagePart.mimeType } }, { text: fullPrompt }] };

        const genContentResponse = await ai.models.generateContent({
            model: activeModel,
            contents: finalContents,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        suggestions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    prompt: {
                                        type: Type.STRING,
                                        description: 'A detailed and creative description of the image, suitable for use as a prompt for an image generation model.',
                                    },
                                    designAnalysis: {
                                        type: Type.STRING,
                                        description: "A detailed, comma-separated list of keywords analyzing the image's design and template. This must include the background, style (e.g., realistic), composition, lighting, and image ratio.",
                                    },
                                },
                                required: ["prompt", "designAnalysis"]
                            }
                        }
                    },
                    required: ["suggestions"],
                },
            },
        });

        const jsonResponse = JSON.parse(genContentResponse.text);

        if (whiteBannerCheckbox.checked) {
            jsonResponse.suggestions.forEach(suggestion => {
                suggestion.prompt = (suggestion.prompt || '').trim() + ' Add 6% white empty border to image.';
            });
        }

        jsonResponse.suggestions.forEach(s => saveToHistory(s.prompt, 'prompt'));
        renderPromptAndAnalysis(jsonResponse.suggestions);

    } catch (error) {
        displayError(processApiError(error));
    } finally {
        hideLoading();
    }
};

/**
 * Handles the generation of specialized candid/polaroid style prompts.
 */
const handleGenerateCandidPrompt = async () => {
    const action = candidActionInput.value.trim();
    const environment = candidEnvironmentInput.value.trim();
    if (!action) {
        alert(translations.candidPromptAlert);
        return;
    }

    const aspectRatio = candidAspectRatioSelector.value;
    const timeOfDay = candidTimeOfDaySelector.value;
    const timeOfDayText = candidTimeOfDaySelector.options[candidTimeOfDaySelector.selectedIndex].text;
    const negativePrompt = negativePromptInput.value.trim();

    showLoading();
    clearResults();

    try {
        const ai = getGenAIClient();
        const activeModel = getActiveModel();
        
        const backgroundInstruction = environment 
            ? `An instruction to replace the background with this user-specified scene: "${environment}".`
            : `An instruction to replace the background with a simple, out-of-focus white curtain.`;
        
        const timeOfDayInstruction = timeOfDay !== 'default'
            ? `The time of day for the scene must be ${timeOfDayText}. This should be strongly reflected in the natural lighting, shadows, and overall mood.`
            : '';

        const polaroidStyleInstructions = `*   The final image must have a classic Polaroid-style aesthetic. The content should be enclosed in a white border, with the bottom part of the border being significantly larger to create a blank white space for text.
    *   It should have a slight motion blur and a grainy texture, as if captured in a spontaneous moment.
    *   The lighting should be harsh and direct, like an on-camera flash used in a dark room, creating strong highlights and deep shadows.`;

        let aestheticAndStyleSection;
        if (whiteBannerCheckbox.checked) {
            aestheticAndStyleSection = `
2.  **Aesthetic, Aspect Ratio, and Banner:**
    *   The prompt must integrate the tag "(106%)" right after describing the main action. For instance: '...a guy hugging a girl(106%), with harsh flash lighting...'. This is the most important instruction for the canvas size.
    *   The final generated image consists of the main photo content (within a Polaroid frame) and an additional white banner below it.
    *   The **main photo content** (inside the frame) MUST have a strict aspect ratio of ${aspectRatio}.
    *   ${polaroidStyleInstructions}
    *   **Additional Banner:** Below the entire Polaroid frame, add a solid white, empty banner across the full width. This banner's height should be approximately 6% of the TOTAL image height.
    *   This structure means the final image will be taller than the content's aspect ratio. This is intentional to allow for cropping later without affecting the main content's ratio.`;
        } else {
            aestheticAndStyleSection = `
2.  **Aesthetic & Style:**
    *   The core image content itself MUST have an aspect ratio of ${aspectRatio}. This is a strict requirement.
    *   ${polaroidStyleInstructions}`;
        }
        
        let systemPrompt = `Based on the user's requested action "${action}", generate two distinct, detailed prompts for an AI image editor.
The goal is to create a candid, intimate photo of two people with a Polaroid camera aesthetic.

Each generated prompt MUST contain the following elements, phrased naturally:

1.  **ABSOLUTE HIGHEST PRIORITY: DO NOT CHANGE FACES.** This is the most critical instruction. Each prompt must contain a direct, explicit, and forceful command to preserve the exact facial features and identities of the people from the original photo. Their faces MUST NOT be altered in any way. For example, the prompt must include a command like: "It is absolutely critical to preserve the exact facial features, expressions, and identities of the people from the original photo. Do not alter their faces in any way."
${aestheticAndStyleSection}
3.  **Action, Background, and Time of Day:**
    *   A natural, non-posed description of the user's requested action: "${action}".
    *   ${backgroundInstruction}
    *   ${timeOfDayInstruction}`;
        
        if (negativePrompt) {
            systemPrompt += `\n\n4.  **Exclusions:** Each prompt MUST avoid generating anything related to these concepts: "${negativePrompt}".`;
        }

        systemPrompt += `\n\nDo not use markdown in the output. The output must only be the JSON object.`;

        const genContentResponse = await ai.models.generateContent({
            model: activeModel,
            contents: systemPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        prompts: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                                description: 'A detailed prompt for editing an image to a candid, Polaroid style.'
                            }
                        }
                    },
                    required: ["prompts"],
                },
            },
        });
        
        const jsonResponse = JSON.parse(genContentResponse.text);
        let finalPrompts = jsonResponse.prompts;
        if (whiteBannerCheckbox.checked) {
            finalPrompts = finalPrompts.map(p => (p || '').trim() + ' Add 6% white empty border to image.');
        }
        const suggestions = finalPrompts.map(p => ({ prompt: p, designAnalysis: null }));

        suggestions.forEach(s => saveToHistory(s.prompt, 'candid'));
        renderPromptAndAnalysis(suggestions);

    } catch (error) {
        displayError(processApiError(error));
    } finally {
        hideLoading();
    }
};

/**
 * Handles the generation of advertisement prompts.
 */
const handleGenerateAdPrompt = async () => {
    const productDescription = builderPromptInput.value.trim();
    const negativePrompt = negativePromptInput.value.trim();

    if (!productDescription) {
        alert(translations.productDescriptionError || "Please enter a product description.");
        return;
    }
    
    if (adCreatorSubMode === 'reference' && !uploadedFile) {
        alert(translations.uploadReferenceAdError || "Please upload a reference advertisement image.");
        return;
    }

    showLoading();
    clearResults();

    try {
        const ai = getGenAIClient();
        const activeModel = getActiveModel();
        const contents = [];
        let systemPrompt;

        const textIntegrationInstructions = [];

        // Product Name
        const productName = adProductNameInput.value.trim();
        const isProductNameBlank = document.getElementById('ad-product-name-blank-checkbox').checked;
        const addProductNameBanner = document.getElementById('ad-product-name-banner-checkbox').checked;

        if (productName) {
            if (isProductNameBlank) {
                 if (addProductNameBanner) {
                    textIntegrationInstructions.push(`    *   Product Name: Create an aesthetically pleasing, design-complementary banner or background element suitable for text placement, and leave this area blank for the text "${productName}".`);
                } else {
                    textIntegrationInstructions.push(`    *   Product Name: Leave a well-composed blank space for the product name ("${productName}").`);
                }
            } else {
                textIntegrationInstructions.push(`    *   Product Name: "${productName}"`);
            }
        }

        // Slogan
        const slogan = adSloganInput.value.trim();
        const isSloganBlank = document.getElementById('ad-slogan-blank-checkbox').checked;
        const addSloganBanner = document.getElementById('ad-slogan-banner-checkbox').checked;
        if (slogan) {
            if (isSloganBlank) {
                if (addSloganBanner) {
                    textIntegrationInstructions.push(`    *   Promotional Text: Create an aesthetically pleasing, design-complementary banner or background element suitable for text placement, and leave this area blank for the promotional text "${slogan}".`);
                } else {
                    textIntegrationInstructions.push(`    *   Promotional Text: Leave a well-composed blank space for the promotional text ("${slogan}").`);
                }
            } else {
                textIntegrationInstructions.push(`    *   Promotional Text: "${slogan}"`);
            }
        }
        
        // Additional Fields
        document.querySelectorAll('.ad-additional-field-row').forEach(field => {
            const title = field.querySelector('.ad-field-title').value.trim();
            const value = field.querySelector('.ad-field-value').value.trim();
            const isBlank = field.querySelector('.ad-field-blank-checkbox').checked;
            const addBanner = field.querySelector('.ad-field-banner-checkbox').checked;

            if (title && value) {
                if (isBlank) {
                    if (addBanner) {
                         textIntegrationInstructions.push(`    *   ${title}: Create an aesthetically pleasing, design-complementary banner or background element suitable for text placement, and leave this area blank for the text "${value}".`);
                    } else {
                        textIntegrationInstructions.push(`    *   ${title}: Leave a well-composed blank space for this text ("${value}").`);
                    }
                } else {
                    textIntegrationInstructions.push(`    *   ${title}: "${value}"`);
                }
            }
        });

        const textIntegrationString = textIntegrationInstructions.length > 0 ? textIntegrationInstructions.join('\n') : 'No text elements specified.';

        const adBannerInstruction = `CRITICAL: The prompt you generate MUST integrate the tag "(106%)" immediately after the main subject phrase. For example, instead of '(106%) A commercial advertisement image...', it should be 'A commercial advertisement image(106%)...'. This tag is essential. The rest of the prompt must describe a composition where all important visual elements are placed in the top portion of the canvas, leaving a solid white, empty banner at the very bottom. This banner's height should be about 6% of the total height, effectively creating a taller image to preserve the main content's aspect ratio when the banner is cropped later.`;

        if (adCreatorSubMode === 'reference') {
            const adherenceLevel = adAdherenceSlider.value;
            const adherenceLevelMap = {
                '1': "be loosely inspired by the reference ad's style and layout.",
                '2': "be heavily inspired by the provided reference ad image.",
                '3': "meticulously replicate the visual style, color palette, lighting, mood, and layout of the provided reference ad image. The goal is to create a new ad that looks like it belongs to the same campaign as the reference."
            };
            const adherenceInstruction = adherenceLevelMap[adherenceLevel];

            systemPrompt = `You are an expert advertisement designer and prompt engineer. Your task is to generate a detailed prompt to create a new commercial advertisement image.
You will be provided with several assets. Your task is to generate a single, comprehensive paragraph-style prompt that describes a new ad for the user's product.

**Prompt Generation Rules:**

1.  **Style & Layout:** The new ad's visual style (colors, lighting, mood) and layout (placement of elements) MUST ${adherenceInstruction}
2.  **Product Focus:** The user's product, described as "${productDescription}", MUST be the central subject of the new ad.
3.  **Text Integration:** Based on the user's instructions below, the prompt MUST describe the inclusion of the specified text elements OR describe leaving a blank, well-composed space for them. The style of any generated text should be similar to the text in the reference ad:
${textIntegrationString}
4.  **Logo Placement:**
    *   If a **Page/Brand Logo** is provided, the prompt MUST include a clear instruction to place this logo in a professional, non-intrusive location typical for an advertisement (e.g., "with the provided Page/Brand logo placed subtly in the top-left corner").
    *   If a **Product Logo** is provided, the prompt MUST include a clear instruction to place this logo directly *onto the product* itself within the scene (e.g., "The product has the provided Product Logo clearly visible on its label").
5.  **Product Replacement:** The user may provide replacement product images. For each provided replacement image, you are given the product's name and its image. The prompt you generate **MUST** give a strict and explicit command to use the *exact* provided image for that product in the new advertisement scene, replacing any similar product from the reference ad. Do not generate a new product; use the one supplied.
6.  **Format:** The prompt must be a single, detailed paragraph. Do not use lists. Describe the final image as if you are instructing an artist.
7.  **Exclusions:** ${negativePrompt ? `The scene MUST NOT include: ${negativePrompt}.` : 'None.'}
${whiteBannerCheckbox.checked ? `8. **Banner & Composition:** ${adBannerInstruction}` : ''}

**Final Output:**
The output must be a JSON object with a "prompts" array containing the generated prompt string(s).`;

            const referenceAdPart = await fileToGenerativePart(uploadedFile);
            contents.push({ text: "This is the reference advertisement for style and layout analysis:" });
            contents.push({ inlineData: { data: referenceAdPart.base64, mimeType: referenceAdPart.mimeType } });
        } else { // Idea Mode
            systemPrompt = `You are an expert advertisement designer and prompt engineer. Your task is to generate a detailed prompt to create a new commercial advertisement image from scratch based on the user's idea and assets.

**Prompt Generation Rules:**

1.  **Product Focus:** The user's product, described as "${productDescription}", MUST be the central subject of the new ad. Create a visually appealing, professional scene that showcases this product effectively.
2.  **Text Integration:** Based on the user's instructions below, the prompt MUST describe the inclusion of the specified text elements OR describe leaving a blank, well-composed space for them. The style of any generated text should be professional and suitable for an advertisement:
${textIntegrationString}
3.  **Logo Placement:**
    *   If a **Page/Brand Logo** is provided, the prompt MUST include a clear instruction to place this logo in a professional, non-intrusive location (e.g., "with the provided Page/Brand logo placed subtly in the top-left corner").
    *   If a **Product Logo** is provided, the prompt MUST include a clear instruction to place this logo directly *onto the product* itself within the scene (e.g., "The product has the provided Product Logo clearly visible on its label").
4.  **Product Integration:** The user may provide product images. For each provided image, you are given the product's name. The prompt you generate **MUST** give a strict and explicit command to integrate the *exact* provided image for that product into the new advertisement scene. Do not generate a new product; use the one supplied.
5.  **Format:** The prompt must be a single, detailed paragraph. Do not use lists. Describe the final image as if you are instructing an artist.
6.  **Exclusions:** ${negativePrompt ? `The scene MUST NOT include: ${negativePrompt}.` : 'None.'}
${whiteBannerCheckbox.checked ? `7. **Banner & Composition:** ${adBannerInstruction}` : ''}

**Final Output:**
The output must be a JSON object with a "prompts" array containing the generated prompt string(s).`;
        }
        
        if (uploadedProductLogoFile) {
            const productLogoPart = await fileToGenerativePart(uploadedProductLogoFile);
            contents.push({ text: "This is the Product Logo that MUST be placed ON the product in the new advertisement:" });
            contents.push({ inlineData: { data: productLogoPart.base64, mimeType: productLogoPart.mimeType } });
        }

        if (uploadedLogoFile) {
            const pageLogoPart = await fileToGenerativePart(uploadedLogoFile);
            contents.push({ text: "This is the Page/Brand Logo that MUST be placed on the new advertisement (e.g., in a corner):" });
            contents.push({ inlineData: { data: pageLogoPart.base64, mimeType: pageLogoPart.mimeType } });
        }
        
        const productRows = document.querySelectorAll('.ad-product-row');
        for (const row of productRows) {
            const title = row.querySelector('.ad-product-title').value.trim();
            const fileInput = row.querySelector('.ad-product-image');
            if (title && fileInput.files[0]) {
                const productPart = await fileToGenerativePart(fileInput.files[0]);
                contents.push({ text: `This is the replacement image for the product named "${title}". You MUST use this exact image for the product in the final generated ad.` });
                contents.push({ inlineData: { data: productPart.base64, mimeType: productPart.mimeType } });
            }
        }
        
        contents.push({ text: systemPrompt });

        const genContentResponse = await ai.models.generateContent({
            model: activeModel,
            contents: contents,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        prompts: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                                description: 'A detailed prompt for creating a commercial advertisement image.'
                            }
                        }
                    },
                    required: ["prompts"],
                },
            },
        });

        const jsonResponse = JSON.parse(genContentResponse.text);
        let finalPrompts = jsonResponse.prompts;
        if (whiteBannerCheckbox.checked) {
            finalPrompts = finalPrompts.map(p => (p || '').trim() + ' Add 6% white empty border to image.');
        }
        const suggestions = finalPrompts.map(p => ({ prompt: p, designAnalysis: null }));
        
        suggestions.forEach(s => saveToHistory(s.prompt, 'ad-creator'));
        renderPromptAndAnalysis(suggestions);

    } catch (error) {
        displayError(processApiError(error));
    } finally {
        hideLoading();
    }
};

/**
 * Handles the generation of logo prompts.
 */
const handleGenerateLogoPrompt = async () => {
    const companyName = logoCompanyNameInput.value.trim();
    const industry = logoIndustryInput.value.trim();

    if (!companyName || !industry) {
        alert(translations.logoPromptError || "Please enter a Company Name and Industry.");
        return;
    }
    
    showLoading();
    clearResults();

    try {
        const ai = getGenAIClient();
        const activeModel = getActiveModel();

        const slogan = logoSloganInput.value.trim();
        const coreElements = logoCoreElementsInput.value.trim();
        const motifs = logoMotifsInput.value.trim();
        const colors = logoColorsInput.value.trim();
        const specialEffects = logoSpecialEffectsInput.value.trim();
        const backgroundStyle = logoBackgroundStyleInput.value.trim();
        const negativePrompt = negativePromptInput.value.trim();
        const outputVariation = logoOutputVariationsSelector.value;
        const getSelectedText = (el) => el.options[el.selectedIndex].text;

        let outputVariationRule = '';
        switch (outputVariation) {
            case 'monochrome':
                outputVariationRule = 'The logo MUST be a monochrome design (e.g., black on a white background).';
                break;
            case 'icon-only':
                outputVariationRule = 'The logo MUST be an icon-only design. It must be a purely graphical symbol and MUST NOT include any text, including the company name or slogan.';
                break;
            case 'full-color':
            default:
                outputVariationRule = 'The logo should be a full-color design, using the specified color palette or a suitable one if none is provided.';
                break;
        }
        
        // Dynamic background instructions based on user input
        let backgroundInstructions = '';
        let backgroundRule = '';
        if (backgroundStyle) {
            // User has provided a background style (either by typing or using the color picker).
            backgroundInstructions = `- Background Style: "${backgroundStyle}"`;
            backgroundRule = `The background MUST be based on the user's specified 'Background Style'. For example, if they provided a hex code, use a solid color background. If 'transparent' is mentioned, describe a logo with a transparent background.`;
        } else {
            // No user input for background, so the AI should decide intelligently.
            backgroundInstructions = `- Background Style: Not specified by user.`;
            backgroundRule = `Because no background style was specified by the user, you MUST intelligently choose the most appropriate background based on the selected 'Logo Style / Aesthetic'. For example, a 'Tech & Futuristic (with Glow Effects)' style REQUIRES a dark or black background to be effective. A 'Modern & Minimalist' style often works best on a solid white or light-colored background. Do NOT default to a white background unless it is the best creative choice for the requested style.`;
        }

        let referenceInstruction = '';
        if (uploadedReferenceLogoFile) {
            referenceInstruction = `\n- Reference Image: The user has provided a reference image. Your design for the new logo MUST be heavily inspired by the provided image's style, color palette, and overall concept while adapting it to the new company's details.`;
        }

        const systemPrompt = `You are an expert logo designer and prompt engineer. Your task is to generate a detailed, single-paragraph prompt for an AI image generator (like Imagen or Midjourney) to create a professional logo based on the user's specifications.

**User's Request:**
- Company: "${companyName}"
- Industry: "${industry}"
- Style: ${getSelectedText(logoStyleSelector)}
- Font: ${getSelectedText(logoFontStyleSelector)}
- Slogan: ${slogan || 'None'}
- Core Elements: ${coreElements || 'None'}
- Motifs: ${motifs || 'None'}
- Colors: ${colors || 'None'}
- Special Effects: ${specialEffects || 'None'}
${backgroundInstructions}
${referenceInstruction}

**Prompt Generation Rules:**
1.  Combine all aspects of the user's request into a single, flowing paragraph.
2.  ${backgroundRule}
3.  It MUST include technical terms relevant to the requested style, such as "vector illustration," "minimalist design," "3D render," "metallic sheen," "neon glow," "clean lines," and "high resolution."
4.  ${outputVariationRule}
5.  If a slogan is provided, instruct the AI to place it below or integrated with the main logo mark in the specified font style (unless 'icon-only' is selected).
6.  ${negativePrompt ? `The logo described MUST NOT include: ${negativePrompt}.` : ''}
7.  ${whiteBannerCheckbox.checked ? `CRITICAL: The prompt MUST integrate the tag "(106%)" immediately after the main subject phrase (e.g., 'A minimalist logo for "Xvpan"(106%)...'). It must also describe a composition where the logo is in the top portion, leaving a solid white, empty banner at the very bottom.` : ''}

The output must be a JSON object with a "prompts" array containing the single generated prompt string.`;

        let finalContents;
        if (uploadedReferenceLogoFile) {
            const referenceLogoPart = await fileToGenerativePart(uploadedReferenceLogoFile);
            const imagePart = {
                inlineData: {
                    data: referenceLogoPart.base64,
                    mimeType: referenceLogoPart.mimeType
                }
            };
            const textPart = { text: systemPrompt };
            finalContents = { parts: [imagePart, textPart] };
        } else {
            finalContents = systemPrompt;
        }

        const genContentResponse = await ai.models.generateContent({
            model: activeModel,
            contents: finalContents,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        prompts: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                                description: 'A detailed prompt for creating a professional logo.'
                            }
                        }
                    },
                    required: ["prompts"],
                },
            },
        });
        
        const jsonResponse = JSON.parse(genContentResponse.text);
        let finalPrompts = jsonResponse.prompts;
        if (whiteBannerCheckbox.checked) {
            finalPrompts = finalPrompts.map(p => (p || '').trim() + ' Add 6% white empty border to image.');
        }
        const suggestions = finalPrompts.map(p => ({ prompt: p, designAnalysis: null }));
        
        suggestions.forEach(s => saveToHistory(s.prompt, 'logo-creator'));
        renderPromptAndAnalysis(suggestions);

    } catch (error) {
        displayError(processApiError(error));
    } finally {
        hideLoading();
    }
};


const handleRandomEnvironment = async () => {
    randomEnvironmentButton.disabled = true;
    try {
        const ai = getGenAIClient();
        const response = await ai.models.generateContent({
            model: getActiveModel(),
            contents: "Generate a single, concise description of a random, interesting environment or background for a candid photograph. Examples: 'a messy bedroom with posters on the wall', 'a dimly lit, cozy cafe corner', 'the back of a moving pickup truck at sunset', 'an old, dusty attic filled with forgotten treasures', 'a vibrant, bustling night market in Asia'. Provide only the description text, with no preamble or labels.",
        });
        candidEnvironmentInput.value = response.text.trim();
    } catch (error) {
        candidEnvironmentInput.placeholder = processApiError(error);
        setTimeout(() => {
             candidEnvironmentInput.placeholder = translations.candidEnvironmentPlaceholder || "e.g., a messy bedroom with posters";
        }, 4000);
    } finally {
        randomEnvironmentButton.disabled = false;
    }
};

const handleRandomAction = async () => {
    randomActionButton.disabled = true;
    try {
        const ai = getGenAIClient();
        const response = await ai.models.generateContent({
            model: getActiveModel(),
            contents: "Generate a single, simple, and concise description of a candid action between two people. Examples: 'a guy hugging a girl', 'two friends laughing at a phone', 'a couple sharing an ice cream cone', 'someone whispering a secret to another person'. Provide only the description text, with no preamble or labels.",
        });
        candidActionInput.value = response.text.trim();
    } catch (error) {
        candidActionInput.placeholder = processApiError(error);
        setTimeout(() => {
             candidActionInput.placeholder = translations.promptPlaceholderCandid || "e.g., A guy hugging a girl";
        }, 4000);
    } finally {
        randomActionButton.disabled = false;
    }
};

/**
 * Fetches a random action and environment and populates the inputs.
 */
const handleSurpriseMe = async () => {
    surpriseMeButton.disabled = true;
    surpriseMeButton.classList.add('loading');

    try {
        const ai = getGenAIClient();
        const response = await ai.models.generateContent({
            model: getActiveModel(),
            contents: "Generate a random, creative, and concise 'action' and 'environment' for a candid photograph. The action should describe a simple, natural interaction between two people. The environment should be an interesting setting. Provide the response as a JSON object with two keys: 'action' and 'environment'.",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        action: {
                            type: Type.STRING,
                            description: 'A simple, natural interaction between two people.'
                        },
                        environment: {
                            type: Type.STRING,
                            description: 'An interesting setting or background.'
                        }
                    },
                    required: ["action", "environment"]
                },
            },
        });

        const jsonResponse = JSON.parse(response.text);
        candidActionInput.value = jsonResponse.action;
        candidEnvironmentInput.value = jsonResponse.environment;

    } catch (error) {
        displayError(processApiError(error));
        // Also show feedback on the button itself
        const buttonTextSpan = surpriseMeButton.querySelector('.button-text');
        const originalText = translations.surpriseMeButton || 'Surprise Me';
        buttonTextSpan.textContent = "Error!";
        setTimeout(() => {
            buttonTextSpan.textContent = originalText;
        }, 3000);
    } finally {
        surpriseMeButton.disabled = false;
        surpriseMeButton.classList.remove('loading');
    }
};


/**
 * Handles the form submission for all modes.
 * @param {Event} e The form submission event.
 */
const handleFormSubmit = async (e) => {
  e.preventDefault();

  try {
    if (currentMode === 'builder') {
        await handleBuildPrompt();
    } else if (currentMode === 'prompt') {
        await handleGeneratePrompt(false);
    } else if (currentMode === 'candid') {
        await handleGenerateCandidPrompt();
    } else if (currentMode === 'ad-creator') {
        await handleGenerateAdPrompt();
    } else if (currentMode === 'logo-creator') {
        await handleGenerateLogoPrompt();
    }
  } catch (error) {
    displayError(processApiError(error));
    hideLoading();
  }
};

/**
 * Analyzes the uploaded reference ad to auto-fill description and text fields.
 * @param {File} file The image file to analyze.
 */
const analyzeAdImage = async (file) => {
    analysisAbortController = new AbortController();
    
    const analysisText = document.querySelector('#analysis-overlay p');
    if(analysisText) analysisText.textContent = translations.analyzingAdText || 'Analyzing Reference Ad...';
    
    analysisOverlay.classList.remove('hidden');
    promptForm.querySelectorAll('input, textarea, button, select').forEach(el => el.disabled = true);
    
    // Clear previous results
    builderPromptInput.value = '';
    adProductNameInput.value = '';
    adSloganInput.value = '';
    adAdditionalFieldsList.innerHTML = '';
    adProductsList.innerHTML = '';

    try {
        const ai = getGenAIClient();
        const imagePart = await fileToGenerativePart(file);
        const systemPrompt = `Analyze the provided advertisement image.
1.  Provide a concise, one or two-sentence description of the main product being advertised.
2.  Extract all significant text elements. Identify the primary 'product_name' and the main 'slogan'.
3.  Extract any other text elements (like prices, contact info, dates, feature lists) into a list of objects, where each object has a descriptive 'title' and its corresponding 'value'.
4.  Identify all distinct products visible in the image and list their names or concise descriptions in a 'detected_products' array.

Return a single JSON object with the keys: 'product_description', 'product_name', 'slogan', 'other_elements', and 'detected_products'.
If a field isn't clear, return an empty string for it. If no other elements or products are found, return an empty array for them.`;

        const response = await ai.models.generateContent({
            model: getActiveModel(),
            contents: { parts: [{ inlineData: { data: imagePart.base64, mimeType: imagePart.mimeType } }, { text: systemPrompt }] },
            config: {
                signal: analysisAbortController.signal,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        product_description: { type: Type.STRING },
                        product_name: { type: Type.STRING },
                        slogan: { type: Type.STRING },
                        other_elements: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    title: { type: Type.STRING },
                                    value: { type: Type.STRING }
                                },
                                required: ["title", "value"]
                            }
                        },
                        detected_products: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                                description: "A concise name or description of a product visible in the ad."
                            }
                        }
                    },
                    required: ["product_description", "product_name", "slogan", "other_elements", "detected_products"]
                }
            }
        });

        const jsonResponse = JSON.parse(response.text);

        if (jsonResponse.product_description) {
            builderPromptInput.value = jsonResponse.product_description;
        }
        if (jsonResponse.product_name) {
            adProductNameInput.value = jsonResponse.product_name;
        }
        if (jsonResponse.slogan) {
            adSloganInput.value = jsonResponse.slogan;
        }
        if (jsonResponse.other_elements && jsonResponse.other_elements.length > 0) {
            jsonResponse.other_elements.forEach(el => {
                addAdTextField(el.title, el.value);
            });
        }
        if (jsonResponse.detected_products && jsonResponse.detected_products.length > 0) {
            jsonResponse.detected_products.forEach(productName => {
                addAdProductField(productName);
            });
        }

    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Ad analysis cancelled by user.');
        } else {
            displayError(processApiError(error));
        }
    } finally {
        analysisOverlay.classList.add('hidden');
        promptForm.querySelectorAll('input, textarea, button, select').forEach(el => el.disabled = false);
        checkApiKeyStatus(); // Re-check to ensure submit button state is correct
        analysisAbortController = null;
    }
};

/**
 * Analyzes the uploaded reference logo to auto-fill form fields.
 * @param {File} file The image file to analyze.
 */
const analyzeLogoImage = async (file) => {
    analysisAbortController = new AbortController();
    
    const analysisText = document.querySelector('#analysis-overlay p');
    if(analysisText) analysisText.textContent = translations.analyzingLogoText || 'Analyzing Reference Logo...';

    analysisOverlay.classList.remove('hidden');
    promptForm.querySelectorAll('input, textarea, button, select').forEach(el => el.disabled = true);

    // Clear previous logo fields
    logoStyleSelector.value = 'modern';
    logoCoreElementsInput.value = '';
    logoMotifsInput.value = '';
    logoColorsInput.value = '';
    logoSpecialEffectsInput.value = '';
    logoBackgroundStyleInput.value = '';
    logoFontStyleSelector.value = 'sans-serif';

    try {
        const ai = getGenAIClient();
        const imagePart = await fileToGenerativePart(file);

        const styleOptions = Array.from(logoStyleSelector.options).map(opt => opt.value).join(', ');
        const fontOptions = Array.from(logoFontStyleSelector.options).map(opt => opt.value).join(', ');

        const systemPrompt = `Analyze the provided logo image with the expertise of a professional brand designer. Extract its key design attributes.

Your response MUST be a single JSON object with the following keys: "style", "core_elements", "motifs", "colors", "special_effects", "background_style", "font_style".

- "style": Identify the dominant aesthetic. It MUST be one of the following values: [${styleOptions}].
- "core_elements": Describe the main graphical elements or letters.
- "motifs": List any symbols or icons present.
- "colors": Describe the color palette used (e.g., "Deep blue and vibrant green, #001F3F").
- "special_effects": Describe any effects like glows, gradients, or shadows.
- "background_style": Describe the background (e.g., "solid white", "transparent", "dark with circuit patterns").
- "font_style": Identify the font style used for any text. It MUST be one of the following values: [${fontOptions}].

If an attribute is not present or unclear, return an empty string for that key.`;

        const response = await ai.models.generateContent({
            model: getActiveModel(),
            contents: { parts: [{ inlineData: { data: imagePart.base64, mimeType: imagePart.mimeType } }, { text: systemPrompt }] },
            config: {
                signal: analysisAbortController.signal,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        style: { type: Type.STRING },
                        core_elements: { type: Type.STRING },
                        motifs: { type: Type.STRING },
                        colors: { type: Type.STRING },
                        special_effects: { type: Type.STRING },
                        background_style: { type: Type.STRING },
                        font_style: { type: Type.STRING }
                    },
                    required: ["style", "core_elements", "motifs", "colors", "special_effects", "background_style", "font_style"]
                }
            }
        });

        const jsonResponse = JSON.parse(response.text);

        if (jsonResponse.style) logoStyleSelector.value = jsonResponse.style;
        if (jsonResponse.core_elements) logoCoreElementsInput.value = jsonResponse.core_elements;
        if (jsonResponse.motifs) logoMotifsInput.value = jsonResponse.motifs;
        if (jsonResponse.colors) logoColorsInput.value = jsonResponse.colors;
        if (jsonResponse.special_effects) logoSpecialEffectsInput.value = jsonResponse.special_effects;
        if (jsonResponse.background_style) logoBackgroundStyleInput.value = jsonResponse.background_style;
        if (jsonResponse.font_style) logoFontStyleSelector.value = jsonResponse.font_style;

    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Logo analysis cancelled by user.');
        } else {
            displayError(processApiError(error));
        }
    } finally {
        if(analysisText) analysisText.textContent = translations.analyzingAdText || 'Analyzing Reference Ad...';
        analysisOverlay.classList.add('hidden');
        promptForm.querySelectorAll('input, textarea, button, select').forEach(el => el.disabled = false);
        checkApiKeyStatus();
        analysisAbortController = null;
    }
};


/**
 * Handles file selection, stores the file, and displays a preview.
 */
const handleFileChange = () => {
    const file = fileUploader.files[0];
    if (file) {
        uploadedFile = file;
        imagePreview.src = URL.createObjectURL(file);
        imagePreviewContainer.classList.remove('hidden');

        if (currentMode === 'ad-creator' && adCreatorSubMode === 'reference' && getActiveApiKey()) {
            analyzeAdImage(file);
        }
    }
};

/**
 * Handles logo file selection, stores the file, and displays a preview.
 */
const handleLogoFileChange = () => {
    const file = logoUploader.files[0];
    if (file) {
        uploadedLogoFile = file;
        logoPreview.src = URL.createObjectURL(file);
        logoPreviewContainer.classList.remove('hidden');
    }
};

/**
 * Handles product logo file selection, stores the file, and displays a preview.
 */
const handleProductLogoFileChange = () => {
    const file = productLogoUploader.files[0];
    if (file) {
        uploadedProductLogoFile = file;
        productLogoPreview.src = URL.createObjectURL(file);
        productLogoPreviewContainer.classList.remove('hidden');
    }
};

/**
 * Handles reference logo file selection for the logo creator.
 */
const handleReferenceLogoFileChange = () => {
    const file = logoReferenceUploader.files[0];
    if (file) {
        uploadedReferenceLogoFile = file;
        logoReferencePreview.src = URL.createObjectURL(file);
        logoReferencePreviewContainer.classList.remove('hidden');
        
        if (getActiveApiKey()) {
            analyzeLogoImage(file);
        }
    }
};

// --- SETTINGS MODAL FUNCTIONS ---

/**
 * Validates a single API key by making a lightweight call.
 * @param {string} key The API key to validate.
 * @returns {Promise<'valid' | 'invalid' | 'error'>} The status of the key.
 */
const validateApiKey = async (key) => {
    if (!key) return 'invalid';
    try {
        // Use a temporary client to not interfere with the main one
        const tempAi = new GoogleGenAI({ apiKey: key });
        // A simple, low-cost model call to check authentication
        await tempAi.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: 'test',
        });
        return 'valid';
    } catch (error) {
        const errorMessage = error.toString();
        console.error(`Validation failed for key ...${key.slice(-4)}:`, error);
        if (errorMessage.includes('API key not valid') || errorMessage.includes('permission denied')) {
            return 'invalid';
        }
        // Could be a network error, quota issue, etc.
        return 'error';
    }
};

/**
 * Checks a key's status, updates the global state, and re-renders the key list.
 * @param {string} key The API key to check.
 * @param {boolean} isInitialCheck - Flag to avoid checking all keys on load.
 */
const checkAndRenderKeyStatus = async (key, isInitialCheck = false) => {
    // Don't re-check if status is already known and it's just an initial check
    if (isInitialCheck && apiKeyStatuses[key] && apiKeyStatuses[key] !== 'unchecked') {
        return;
    }

    apiKeyStatuses[key] = 'checking';
    renderApiKeys(); // Show "Checking..."

    const status = await validateApiKey(key);
    apiKeyStatuses[key] = status;
    renderApiKeys(); // Show final status
};

/**
 * Renders the list of saved API keys in the settings modal.
 */
const renderApiKeys = () => {
    const keys = getSavedApiKeys();
    const activeKey = getActiveApiKey();
    apiKeyList.innerHTML = '';

    if (keys.length === 0) {
        noKeysMessage.classList.remove('hidden');
    } else {
        noKeysMessage.classList.add('hidden');
        keys.forEach(key => {
            const li = document.createElement('li');

            const infoDiv = document.createElement('div');
            infoDiv.className = 'api-key-info';
            infoDiv.onclick = () => {
                // Allow clicking the whole area to select the radio
                const radio = li.querySelector('input[type="radio"]');
                if (radio && !radio.checked) {
                    radio.checked = true;
                    // Manually dispatch change event
                    radio.dispatchEvent(new Event('change'));
                }
            };
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'api-key';
            radio.value = key;
            radio.checked = key === activeKey;
            radio.addEventListener('change', () => {
                setActiveApiKey(key);
                checkApiKeyStatus();
                 // If the key hasn't been checked yet, validate it on selection
                if (!apiKeyStatuses[key] || apiKeyStatuses[key] === 'unchecked' || apiKeyStatuses[key] === 'error') {
                    checkAndRenderKeyStatus(key);
                } else {
                    renderApiKeys(); // Re-render to show selection change
                }
            });

            const keyText = document.createElement('span');
            keyText.className = 'api-key-text';
            keyText.textContent = `${key.substring(0, 4)}...${key.substring(key.length - 4)}`;
            
            infoDiv.appendChild(radio);
            infoDiv.appendChild(keyText);
            
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'api-key-actions';

            const status = apiKeyStatuses[key] || 'unchecked';

            const statusSpan = document.createElement('span');
            statusSpan.className = 'api-key-status';
            statusSpan.classList.add(status);
            
            const statusIcon = document.createElement('i');
            statusIcon.className = 'bi';
            
            let statusTextKey = 'apiKeyStatusUnchecked';
            switch (status) {
                case 'valid': statusTextKey = 'apiKeyStatusValid'; statusIcon.classList.add('bi-check-circle-fill'); break;
                case 'invalid': statusTextKey = 'apiKeyStatusInvalid'; statusIcon.classList.add('bi-x-circle-fill'); break;
                case 'checking': statusTextKey = 'apiKeyStatusChecking'; statusIcon.classList.add('bi-arrow-clockwise'); break;
                case 'error': statusTextKey = 'apiKeyStatusError'; statusIcon.classList.add('bi-exclamation-triangle-fill'); break;
                default: statusIcon.classList.add('bi-question-circle');
            }
            statusSpan.appendChild(statusIcon);
            statusSpan.appendChild(document.createTextNode(` ${translations[statusTextKey] || 'Unchecked'}`));
            
            const checkButton = document.createElement('button');
            checkButton.type = 'button';
            checkButton.className = 'icon-button check-key-button';
            checkButton.innerHTML = `<i class="bi bi-arrow-clockwise"></i>`;
            checkButton.title = translations.checkApiKeyButtonTitle || "Check Status";
            checkButton.onclick = (e) => {
                e.stopPropagation(); // Prevent the li click event
                checkAndRenderKeyStatus(key);
            };
            checkButton.disabled = status === 'checking';
             if (status === 'checking') {
                checkButton.classList.add('checking');
            }


            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.className = 'delete-key-button icon-button';
            deleteButton.innerHTML = `<i class="bi bi-trash3-fill"></i>`;
            deleteButton.title = translations.historyDeleteButtonTitle || "Delete";
            deleteButton.onclick = (e) => {
                e.stopPropagation(); // Prevent the li click event
                const newKeys = keys.filter(k => k !== key);
                saveApiKeys(newKeys);
                delete apiKeyStatuses[key]; // Remove status from memory
                if (activeKey === key) {
                    setActiveApiKey(newKeys.length > 0 ? newKeys[0] : '');
                }
                checkApiKeyStatus();
                renderApiKeys();
            };
            
            actionsDiv.appendChild(statusSpan);
            actionsDiv.appendChild(checkButton);
            actionsDiv.appendChild(deleteButton);

            li.appendChild(infoDiv);
            li.appendChild(actionsDiv);
            apiKeyList.appendChild(li);
        });
    }
};

const handleSaveApiKey = () => {
    const newKey = apiKeyInput.value.trim();
    if (!newKey) {
        alert('Please enter an API key.');
        return;
    }
    const keys = getSavedApiKeys();
    if (keys.includes(newKey)) {
        alert('This API key is already saved.');
        return;
    }
    keys.push(newKey);
    saveApiKeys(keys);

    if (!getActiveApiKey()) {
        setActiveApiKey(newKey);
    }
    apiKeyInput.value = '';
    checkApiKeyStatus();
    checkAndRenderKeyStatus(newKey); // Validate the new key immediately
};

const checkApiKeyStatus = () => {
    if (getActiveApiKey()) {
        submitButton.disabled = false;
        feelingLuckyButton.disabled = false;
        apiKeyNotice.classList.add('hidden');
    } else {
        submitButton.disabled = true;
        feelingLuckyButton.disabled = true;
        apiKeyNotice.classList.remove('hidden');
    }
};

/**
 * Creates and appends a new dynamic text field for the Ad Creator.
 * @param {string} title - The initial title for the field.
 * @param {string} value - The initial value for the field.
 */
const addAdTextField = (title = '', value = '') => {
    const row = document.createElement('div');
    row.className = 'ad-additional-field-row';
    const fieldCount = adAdditionalFieldsList.children.length;
    const blankCheckboxId = `ad-field-blank-checkbox-${fieldCount}`;
    const bannerCheckboxId = `ad-field-banner-checkbox-${fieldCount}`;

    // --- Input fields (title, value, translate, remove) ---
    const fieldInputs = document.createElement('div');
    fieldInputs.className = 'field-inputs';

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.className = 'ad-field-title';
    titleInput.placeholder = translations.adFieldTitlePlaceholder || "Title (e.g., Price)";
    titleInput.value = title;
    
    const valueWrapper = document.createElement('div');
    valueWrapper.className = 'prompt-wrapper';

    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.className = 'ad-field-value';
    valueInput.placeholder = translations.adFieldValuePlaceholder || "Value (e.g., $19.99)";
    valueInput.value = value;

    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'prompt-buttons-wrapper';
    
    const translateButton = document.createElement('button');
    translateButton.type = 'button';
    translateButton.className = 'icon-button translate-button';
    translateButton.title = translations.translateButtonTitle || 'Translate from Myanmar to English';
    translateButton.innerHTML = '<i class="bi bi-translate"></i>';
    translateButton.onclick = () => handleTranslateClick(valueInput, translateButton);

    buttonWrapper.appendChild(translateButton);
    valueWrapper.appendChild(valueInput);
    valueWrapper.appendChild(buttonWrapper);

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'icon-button remove-field-button';
    removeButton.innerHTML = '<i class="bi bi-x-lg"></i>';
    removeButton.title = translations.removeFieldButtonTitle || "Remove Field";
    removeButton.onclick = () => {
        row.remove();
    };
    
    fieldInputs.appendChild(titleInput);
    fieldInputs.appendChild(valueWrapper);
    fieldInputs.appendChild(removeButton);
    row.appendChild(fieldInputs);

    // --- Checkbox group ---
    const checkboxGroup = document.createElement('div');
    checkboxGroup.className = 'ad-field-checkbox-group';

    // "Leave blank" checkbox
    const blankCheckboxContainer = document.createElement('div');
    blankCheckboxContainer.className = 'checkbox-container inline-checkbox';
    const blankCheckbox = document.createElement('input');
    blankCheckbox.type = 'checkbox';
    blankCheckbox.id = blankCheckboxId;
    blankCheckbox.className = 'ad-field-blank-checkbox';
    const blankLabel = document.createElement('label');
    blankLabel.htmlFor = blankCheckboxId;
    blankLabel.textContent = translations.leaveSpaceForTextLabel || 'Leave space for text';
    blankCheckboxContainer.appendChild(blankCheckbox);
    blankCheckboxContainer.appendChild(blankLabel);
    
    // "Add banner" checkbox
    const bannerCheckboxContainer = document.createElement('div');
    bannerCheckboxContainer.className = 'checkbox-container inline-checkbox';
    const bannerCheckbox = document.createElement('input');
    bannerCheckbox.type = 'checkbox';
    bannerCheckbox.id = bannerCheckboxId;
    bannerCheckbox.className = 'ad-field-banner-checkbox';
    bannerCheckbox.disabled = true; // Disabled by default
    const bannerLabel = document.createElement('label');
    bannerLabel.htmlFor = bannerCheckboxId;
    bannerLabel.textContent = translations.addBannerForTextLabel || 'Add a design banner';
    bannerCheckboxContainer.appendChild(bannerCheckbox);
    bannerCheckboxContainer.appendChild(bannerLabel);

    // Logic to enable/disable banner checkbox
    blankCheckbox.addEventListener('change', () => {
        bannerCheckbox.disabled = !blankCheckbox.checked;
        if (!blankCheckbox.checked) {
            bannerCheckbox.checked = false;
        }
    });

    checkboxGroup.appendChild(blankCheckboxContainer);
    checkboxGroup.appendChild(bannerCheckboxContainer);
    row.appendChild(checkboxGroup);
    
    adAdditionalFieldsList.appendChild(row);
};

/**
 * Creates and appends a new product field for the Ad Creator.
 * @param {string} productName - The initial name for the product.
 */
const addAdProductField = (productName = '') => {
    const row = document.createElement('div');
    row.className = 'ad-product-row';

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.className = 'ad-product-title';
    titleInput.placeholder = translations.productTitlePlaceholder || "Product Title (e.g., Soda Can)";
    titleInput.value = productName;
    
    const imageInput = document.createElement('input');
    imageInput.type = 'file';
    imageInput.className = 'ad-product-image';
    imageInput.accept = "image/*";

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'icon-button remove-field-button';
    removeButton.innerHTML = '<i class="bi bi-x-lg"></i>';
    removeButton.title = translations.removeProductButtonTitle || "Remove Product";
    removeButton.onclick = () => {
        row.remove();
    };
    
    row.appendChild(titleInput);
    row.appendChild(imageInput);
    row.appendChild(removeButton);
    
    adProductsList.appendChild(row);
};

// --- INITIALIZATION ---

document.addEventListener('DOMContentLoaded', async () => {

    // Theme toggle logic
    const getSavedTheme = () => localStorage.getItem('theme') || 'dark'; // Default to dark
    const saveTheme = (theme) => localStorage.setItem('theme', theme);

    const applyTheme = (theme) => {
        document.body.setAttribute('data-theme', theme);
        saveTheme(theme);
        const icon = themeToggleButton.querySelector('i');
        if (theme === 'light') {
            icon.classList.remove('bi-moon-stars-fill');
            icon.classList.add('bi-sun-fill');
        } else {
            icon.classList.remove('bi-sun-fill');
            icon.classList.add('bi-moon-stars-fill');
        }
    };

    themeToggleButton.addEventListener('click', () => {
        const currentTheme = getSavedTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // Add `data-app-mode` to body for CSS selectors
    document.body.dataset.appMode = currentMode;
    modeRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        currentMode = e.target.value;
        document.body.dataset.appMode = currentMode; // Set app mode for CSS
        updateUIMode();
      });
    });
    
    numPromptsSlider.addEventListener('input', (e) => {
        numPromptsValue.textContent = e.target.value;
    });

    detailLevelSlider.addEventListener('input', (e) => {
        const level = e.target.value;
        let translationKey;
        if (level === '1') translationKey = 'detailLevelLow';
        else if (level === '2') translationKey = 'detailLevelMedium';
        else if (level === '3') translationKey = 'detailLevelHigh';
        
        detailLevelValue.textContent = translations[translationKey] || `Level ${level}`;
        detailLevelValue.setAttribute('data-translate', translationKey);
    });

    adAdherenceSlider.addEventListener('input', (e) => {
        const level = e.target.value;
        let translationKey;
        if (level === '1') translationKey = 'adAdherenceLevelLow';
        else if (level === '2') translationKey = 'adAdherenceLevelMedium';
        else if (level === '3') translationKey = 'adAdherenceLevelHigh';
        
        adAdherenceLevelValue.textContent = translations[translationKey] || `Level ${level}`;
        adAdherenceLevelValue.setAttribute('data-translate', translationKey);
    });
    
    candidOrientationToggle.addEventListener('change', () => {
        populateCandidAspectRatioDropdown(candidOrientationToggle.checked);
    });

    fileUploader.addEventListener('change', handleFileChange);
    logoUploader.addEventListener('change', handleLogoFileChange);
    productLogoUploader.addEventListener('change', handleProductLogoFileChange);
    logoReferenceUploader.addEventListener('change', handleReferenceLogoFileChange);
    promptForm.addEventListener('submit', handleFormSubmit);
    feelingLuckyButton.addEventListener('click', () => handleGeneratePrompt(true));
    enhanceBuilderButton.addEventListener('click', () => handleEnhancePrompt(builderPromptInput, enhanceBuilderButton));
    randomEnvironmentButton.addEventListener('click', handleRandomEnvironment);
    randomActionButton.addEventListener('click', handleRandomAction);
    surpriseMeButton.addEventListener('click', handleSurpriseMe);
    addAdFieldButton.addEventListener('click', () => addAdTextField());
    addAdProductButton.addEventListener('click', () => addAdProductField());
    translateProductNameButton.addEventListener('click', () => handleTranslateClick(adProductNameInput, translateProductNameButton));
    translateSloganButton.addEventListener('click', () => handleTranslateClick(adSloganInput, translateSloganButton));
    
    logoColorPicker.addEventListener('input', () => {
        const currentColor = logoColorsInput.value.trim();
        const newColor = logoColorPicker.value;

        if (currentColor) {
            logoColorsInput.value = `${currentColor}, ${newColor}`;
        } else {
            logoColorsInput.value = newColor;
        }
    });

    logoBackgroundColorPicker.addEventListener('input', () => {
        const currentStyle = logoBackgroundStyleInput.value.trim();
        const newColor = logoBackgroundColorPicker.value;

        if (currentStyle) {
            logoBackgroundStyleInput.value = `${currentStyle}, ${newColor}`;
        } else {
            logoBackgroundStyleInput.value = newColor;
        }
    });

    adSubModeRadios.forEach(radio => {
        radio.addEventListener('change', updateAdCreatorSubModeUI);
    });

    cancelAnalysisButton.addEventListener('click', () => {
        if (analysisAbortController) {
            analysisAbortController.abort();
        }
        // Immediately reset file input UI for ad creator only
        if (currentMode === 'ad-creator') {
            fileUploader.value = '';
            uploadedFile = null;
            imagePreviewContainer.classList.add('hidden');
            imagePreview.src = '';
        }
    });
    
    // Ad Creator Checkbox Logic
    const setupDependentCheckbox = (masterId, dependentId) => {
        const masterCheckbox = document.getElementById(masterId);
        const dependentCheckbox = document.getElementById(dependentId);
        if (masterCheckbox && dependentCheckbox) {
            masterCheckbox.addEventListener('change', () => {
                dependentCheckbox.disabled = !masterCheckbox.checked;
                if (!masterCheckbox.checked) {
                    dependentCheckbox.checked = false;
                }
            });
        }
    };
    setupDependentCheckbox('ad-product-name-blank-checkbox', 'ad-product-name-banner-checkbox');
    setupDependentCheckbox('ad-slogan-blank-checkbox', 'ad-slogan-banner-checkbox');


    optionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            optionTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const target = tab.getAttribute('data-tab');
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `tab-content-${target}`) {
                    content.classList.add('active');
                }
            });
        });
    });

    const isAnyModalOpen = () => document.querySelector('.modal-overlay:not(.hidden)') !== null;

    const closeModal = (modal) => {
        modal.classList.add('hidden');
        if (!isAnyModalOpen()) {
            document.body.classList.remove('modal-open');
        }
    };
    
    // Setup for all modals
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        const closeBtn = modal.querySelector('.close-button');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal));
        }
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    copyFullPromptButton.addEventListener('click', () => {
        navigator.clipboard.writeText(fullPromptText.textContent);
        const buttonText = copyFullPromptButton.querySelector('span');
        const originalText = translations.copyPromptButton || 'Copy Prompt';
        buttonText.textContent = translations.copiedButton || 'Copied!';
        setTimeout(() => {
            buttonText.textContent = originalText;
        }, 2000);
    });

    policyButton.addEventListener('click', () => {
        policyModal.classList.remove('hidden');
        document.body.classList.add('modal-open');
    });

    donationButton.addEventListener('click', () => {
        donationModal.classList.remove('hidden');
        document.body.classList.add('modal-open');
    });

    copyDonationPhoneButton.addEventListener('click', () => {
        navigator.clipboard.writeText(donationPhoneNumber.textContent.trim().replace(/\s/g, ''));
        const icon = copyDonationPhoneButton.querySelector('i');
        const originalTitle = copyDonationPhoneButton.title;
        
        icon.classList.remove('bi-clipboard');
        icon.classList.add('bi-check-lg');
        copyDonationPhoneButton.title = translations.copiedButton || "Copied!";

        setTimeout(() => {
            icon.classList.remove('bi-check-lg');
            icon.classList.add('bi-clipboard');
            copyDonationPhoneButton.title = originalTitle;
        }, 2000);
    });

    closeSuggestionsModalButton.addEventListener('click', () => closeModal(suggestionsModal));
    
    const renderHistoryList = (searchText = '', filterMode = 'all', filterDate = 'all') => {
        const fullHistory = getPromptHistory();
        let filteredHistory = fullHistory;

        // Apply search filter
        if (searchText) {
            const lowerCaseSearch = searchText.toLowerCase();
            filteredHistory = filteredHistory.filter(item =>
                item.prompt.toLowerCase().includes(lowerCaseSearch)
            );
        }

        // Apply mode filter
        if (filterMode !== 'all') {
            filteredHistory = filteredHistory.filter(item => item.mode === filterMode);
        }

        // Apply date filter
        if (filterDate !== 'all') {
            const now = new Date();
            let startDate;
            if (filterDate === 'today') {
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            } else if (filterDate === '7days') {
                startDate = new Date();
                startDate.setDate(now.getDate() - 7);
            } else if (filterDate === '30days') {
                startDate = new Date();
                startDate.setDate(now.getDate() - 30);
            }

            if (startDate) {
                filteredHistory = filteredHistory.filter(item => item.timestamp >= startDate.getTime());
            }
        }
        
        historyList.innerHTML = '';

        if (fullHistory.length === 0) {
            noHistoryMessage.textContent = translations.noHistoryMessageText || 'No recent prompts.';
            noHistoryMessage.classList.remove('hidden');
            clearHistoryButton.classList.add('hidden');
            return; // Exit early if there's no history at all
        }

        if (filteredHistory.length === 0) {
            noHistoryMessage.textContent = translations.noHistoryFilterResults || 'No results match your filters.';
            noHistoryMessage.classList.remove('hidden');
            clearHistoryButton.classList.remove('hidden'); // Keep clear button visible to clear the whole history
        } else {
            noHistoryMessage.classList.add('hidden');
            clearHistoryButton.classList.remove('hidden');

            const modeInfoMap = {
                builder: { icon: 'bi-tools', key: 'historyModeBuilder' },
                prompt: { icon: 'bi-image', key: 'historyModeFromImage' },
                candid: { icon: 'bi-camera-reels', key: 'historyModeCandidAction' },
                'ad-creator': { icon: 'bi-megaphone', key: 'historyModeAdCreator' },
                'logo-creator': { icon: 'bi-bounding-box-circles', key: 'historyModeLogoCreator' }
            };

            filteredHistory.forEach(item => {
                const card = document.createElement('div');
                card.className = 'history-card';

                const modeInfo = modeInfoMap[item.mode] || modeInfoMap.builder;
                const modeText = translations[modeInfo.key] || item.mode;
                const dateString = new Date(item.timestamp).toLocaleString(document.documentElement.lang, {
                    year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                });

                card.innerHTML = `
                    <div class="history-card-header">
                        <div class="history-card-info">
                            <i class="bi ${modeInfo.icon}"></i>
                            <span class="history-card-mode">${modeText}</span>
                        </div>
                        <span class="history-card-timestamp">${dateString}</span>
                    </div>
                    <div class="history-card-body">
                        <p class="history-prompt-preview">${item.prompt.substring(0, 100)}${item.prompt.length > 100 ? '...' : ''}</p>
                        <pre class="history-prompt-full hidden">${item.prompt}</pre>
                    </div>
                    <div class="history-card-actions">
                        <button type="button" class="icon-button expand-history-button" title="${translations.historyExpandButtonTitle || 'Expand'}">
                            <i class="bi bi-arrows-expand"></i>
                        </button>
                        <button type="button" class="icon-button copy-history-button" title="${translations.historyCopyButtonTitle || 'Copy'}">
                            <i class="bi bi-clipboard"></i>
                        </button>
                        <button type="button" class="icon-button delete-button delete-history-button" title="${translations.historyDeleteButtonTitle || 'Delete'}">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </div>
                `;

                const promptPreview = card.querySelector('.history-prompt-preview');
                const promptFull = card.querySelector('.history-prompt-full');

                // Expand/Collapse Button
                const expandBtn = card.querySelector('.expand-history-button');
                expandBtn.addEventListener('click', () => {
                    const isExpanded = promptFull.classList.toggle('hidden');
                    promptPreview.classList.toggle('hidden', !isExpanded);
                    expandBtn.innerHTML = `<i class="bi ${isExpanded ? 'bi-arrows-expand' : 'bi-arrows-collapse'}"></i>`;
                    expandBtn.title = isExpanded ? (translations.historyExpandButtonTitle || 'Expand') : (translations.historyCollapseButtonTitle || 'Collapse');
                });

                // Copy Button
                const copyBtn = card.querySelector('.copy-history-button');
                copyBtn.addEventListener('click', () => {
                    navigator.clipboard.writeText(item.prompt);
                    const icon = copyBtn.querySelector('i');
                    icon.classList.remove('bi-clipboard');
                    icon.classList.add('bi-check-lg');
                    setTimeout(() => {
                        icon.classList.remove('bi-check-lg');
                        icon.classList.add('bi-clipboard');
                    }, 2000);
                });

                // Delete Button
                const deleteBtn = card.querySelector('.delete-history-button');
                deleteBtn.addEventListener('click', () => {
                    let currentHistory = getPromptHistory();
                    currentHistory = currentHistory.filter(h => h.timestamp !== item.timestamp);
                    localStorage.setItem('promptHistory', JSON.stringify(currentHistory));
                    applyHistoryFiltersAndRender(); // Re-render the list with current filters
                });

                historyList.appendChild(card);
            });
        }
    };
    
    const applyHistoryFiltersAndRender = () => {
        const searchText = historySearchInput.value.trim();
        const filterMode = historyModeFilter.value;
        const filterDate = historyDateFilter.value;
        renderHistoryList(searchText, filterMode, filterDate);
    };

    historyButton.addEventListener('click', () => {
        // Reset filters before opening
        historySearchInput.value = '';
        historyModeFilter.value = 'all';
        historyDateFilter.value = 'all';
        renderHistoryList();
        historyModal.classList.remove('hidden');
        document.body.classList.add('modal-open');
    });
    
    clearHistoryButton.addEventListener('click', () => {
        if (confirm(translations.confirmClearHistory || "Are you sure you want to clear all prompt history? This cannot be undone.")) {
            localStorage.setItem('promptHistory', '[]');
            renderHistoryList();
        }
    });

    historySearchInput.addEventListener('input', applyHistoryFiltersAndRender);
    historyModeFilter.addEventListener('change', applyHistoryFiltersAndRender);
    historyDateFilter.addEventListener('change', applyHistoryFiltersAndRender);


    const initializeModelSelector = () => {
        modelSelectorDropdown.value = getActiveModel();
    };
    
    const initializeUiModeSelector = () => {
        const currentUiMode = getUiMode();
        document.body.dataset.uiMode = currentUiMode; // Set UI mode for CSS
        const radio = document.querySelector(`input[name="ui-mode"][value="${currentUiMode}"]`);
        if (radio) radio.checked = true;
    };
    
    uiModeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const newMode = e.target.value;
            saveUiMode(newMode);
            document.body.dataset.uiMode = newMode;
            updateUIMode();
        });
    });

    settingsButton.addEventListener('click', () => {
        renderApiKeys();
        initializeModelSelector();
        settingsModal.classList.remove('hidden');
        document.body.classList.add('modal-open');
    });

    saveApiKeyButton.addEventListener('click', handleSaveApiKey);
    apiKeyInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSaveApiKey();
        }
    });
    
    modelSelectorDropdown.addEventListener('change', (e) => {
        saveActiveModel(e.target.value);
    });

    languageToggle.addEventListener('change', () => {
        const lang = languageToggle.checked ? 'my' : 'en';
        setLanguage(lang);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal-overlay:not(.hidden)');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });

    applyTheme(getSavedTheme());
    populateCandidAspectRatioDropdown(false);
    await setLanguage(getSavedLanguage());
    checkApiKeyStatus();
    // Validate the active API key on initial load
    const activeKey = getActiveApiKey();
    if (activeKey) {
        checkAndRenderKeyStatus(activeKey, true);
    }
    initializeModelSelector();
    initializeUiModeSelector();
    updateUIMode();
});