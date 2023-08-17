# 🍦 Vanilla Trello

### 개요

어떠한 라이브러리, 프레임워크를 사용하지 않고 바닐라 자바스크립트만으로  
CBD를 기반으로한 SPA라이브러리를 모방하여 [Trello](https://trello.com/) 서비스를 구현해봅니다.

> **CBD**  
> [Component-Based Development](https://ko.wikipedia.org/wiki/%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8_%EA%B8%B0%EB%B0%98_%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4_%EA%B3%B5%ED%95%99)

> **SPA**  
> [Single Page Application](https://ko.wikipedia.org/wiki/%EC%8B%B1%EA%B8%80_%ED%8E%98%EC%9D%B4%EC%A7%80_%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98)

### 프로젝트 기간

- 2023.07 - 진행중

### 배포링크

[배포페이지](https://5kdk.github.io/Vanilla-Trello/)

### 주요 개발사항

- CBD/SPA 라이브러리 구현
- 선언적으로 view를 정의
- 상태기반 렌더링(DOM 요소 참소 지양)
- 상태관리로 Proxy 객체를 사용하지 않고 컴포넌트가 상태를 가지도록 구현
- diff 알고리즘([Reconciliation](https://ko.legacy.reactjs.org/docs/reconciliation.html)) 구현
- 다중 컴포넌트 지원
- Trello 서비스 구현
