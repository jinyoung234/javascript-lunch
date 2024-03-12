import {
  categoryAsian,
  categoryChinese,
  categoryEtc,
  categoryJapanese,
  categoryKorean,
  categoryWestern,
} from "../../../assets/images";

import { MenuCategoryWithoutAll } from "../../../constants/menuCategory/menuCategory.type";
import BaseComponent from "../../BaseComponent/BaseComponent";

class CategoryIcon extends BaseComponent {
  private categoryImage: Record<MenuCategoryWithoutAll, string> = {
    아시안: categoryAsian,
    양식: categoryWestern,
    일식: categoryJapanese,
    중식: categoryChinese,
    한식: categoryKorean,
    기타: categoryEtc,
  };

  protected render(): void {
    const category = this.getAttribute("category") as MenuCategoryWithoutAll;

    this.innerHTML = `
        <img src=${this.convertCategoryToImage(category)} alt=${category}>
      `;
  }

  private convertCategoryToImage(category: MenuCategoryWithoutAll) {
    return this.categoryImage[category];
  }
}

customElements.define("category-icon", CategoryIcon);