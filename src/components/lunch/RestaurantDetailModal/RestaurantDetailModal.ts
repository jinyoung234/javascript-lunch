import "../RestaurantDetailModal/RestaurantDetailModal.css";

import { CUSTOM_EVENT_TYPE } from "../../../constants/eventType";
import { ELEMENT_SELECTOR } from "../../../constants/selector";
import { RestaurantDetail } from "../../../domain/Restaurant/Restaurant.type";
import BaseComponent from "../../BaseComponent/BaseComponent";
import { $ } from "../../../utils/dom";
import Restaurant from "../../../domain/Restaurant/Restaurant";

class RestaurantDetailModal extends BaseComponent {
  private restaurantDetail: RestaurantDetail | null = null;

  private eventListeners = {
    restaurantDetailModalOpen: {
      eventName: CUSTOM_EVENT_TYPE.restaurantDetailModalOpen,
      eventHandler: this.handleOpenRestaurantDetailModal.bind(this),
    },

    restaurantDetailModalClose: {
      eventName: "click" as keyof HTMLElementEventMap,
      eventHandler: this.handleCloseRestaurantDetailModal.bind(this),
    },
  };

  protected render(): void {
    this.innerHTML = `
      <common-modal
        open="${CUSTOM_EVENT_TYPE.restaurantDetailModalOpen}"
        close="${CUSTOM_EVENT_TYPE.restaurantDetailModalClose}"
        targetSelector="${ELEMENT_SELECTOR.restaurantDetailModal}"  
        id="restaurant-detail-modal"
      >
        ${
          this.restaurantDetail
            ? `<restaurant-detail-modal-content 
                name='${this.restaurantDetail.name}'
                category='${this.restaurantDetail.category}'
                description='${this.restaurantDetail.description}'
                distance='${this.restaurantDetail.distance}'
                isFavorite='${this.restaurantDetail.isFavorite}'
                url='${this.restaurantDetail.url}'
              ></restaurant-detail-modal-content>`
            : ""
        }
      </common-modal>
    `;
  }

  protected setEvent(): void {
    this.on({
      ...this.eventListeners.restaurantDetailModalOpen,
      target: document,
    });

    this.on({
      ...this.eventListeners.restaurantDetailModalClose,
      target: this,
    });
  }

  private handleOpenRestaurantDetailModal(event: Event) {
    if (event instanceof CustomEvent) {
      this.restaurantDetail = event.detail;

      this.connectedCallback();
    }
  }

  private handleCloseRestaurantDetailModal(event: Event) {
    const modalCancelButtonElement = $(
      ELEMENT_SELECTOR.modalCancelButton,
      this
    );

    if (event.target === modalCancelButtonElement) {
      this.emit(CUSTOM_EVENT_TYPE.restaurantDetailModalClose);
    }
  }

  protected removeEvent(): void {
    this.off({
      ...this.eventListeners.restaurantDetailModalOpen,
      target: document,
    });

    this.off({
      ...this.eventListeners.restaurantDetailModalClose,
      target: this,
    });
  }
}

customElements.define("restaurant-detail-modal", RestaurantDetailModal);
