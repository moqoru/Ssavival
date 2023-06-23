package com.oguogu.m59s.model.service;

import com.oguogu.m59s.model.dto.ChatGptRequestDto;
import com.oguogu.m59s.model.dto.ChatGptResponseDto;
import com.oguogu.m59s.model.dto.QuestionRequestDto;
import org.springframework.http.HttpEntity;

public interface ChatGptService {
    public HttpEntity<ChatGptRequestDto> buildHttpEntity(ChatGptRequestDto requestDto);
    public ChatGptResponseDto getResponse(HttpEntity<ChatGptRequestDto> chatGptRequestDtoHttpEntity);
    public ChatGptResponseDto askQuestion(QuestionRequestDto requestDto);
}
