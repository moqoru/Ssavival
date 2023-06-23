package com.oguogu.m59s.model.service;

import com.oguogu.m59s.entity.MiniGame;
import com.oguogu.m59s.entity.MiniGameDetail;
import com.oguogu.m59s.model.dto.GameDto;
import com.oguogu.m59s.model.dto.GameImageDto;
import com.oguogu.m59s.model.dto.MiniGameDto;
import com.oguogu.m59s.model.dto.MiniGameInfoDto;

import java.util.List;

public interface GameService {
    List<MiniGameInfoDto> listMiniGame(long gameId);
    List<GameDto> listGame(long userId);
    long findGameLastIndex();
    long findMiniGameLastIndex();
    void saveGameImage(GameImageDto gameImageDto);
    void saveMiniGame(MiniGameDto miniGameDto);
    void saveGame(GameDto gameDto);
    void updateGame(GameDto gameDto);
    List<GameImageDto> listGameImage(long miniGameId);
}
